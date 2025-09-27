import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

interface DeleteAccountRequest {
  userId: string
  deletionType: 'immediate' | 'deactivate'
  reason?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, deletionType = 'deactivate', reason }: DeleteAccountRequest = req.body

    if (!userId) {
      return res.status(400).json({
        error: 'Missing required field: userId'
      })
    }

    // Create admin client for user management
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({
        error: 'Server configuration error: Supabase credentials missing'
      })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get user info before deletion for audit purposes
    const { data: user, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId)

    if (getUserError || !user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    if (deletionType === 'immediate') {
      // Phase 1: Immediate Complete Deletion
      await performImmediateDeletion(supabaseAdmin, userId, user.user, reason)
    } else {
      // Phase 2: Healthcare-Compliant Deactivation
      await performAccountDeactivation(supabaseAdmin, userId, user.user, reason)
    }

    return res.status(200).json({
      message: deletionType === 'immediate'
        ? 'Account deleted successfully'
        : 'Account deactivated successfully. You have 30 days to recover your account.',
      deletionType,
      userId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('BMad Method: Account deletion error:', error)

    return res.status(500).json({
      error: 'Failed to delete account',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}

async function performImmediateDeletion(
  supabaseAdmin: any,
  userId: string,
  user: any,
  reason?: string
) {
  console.log('BMad Method: Starting immediate account deletion for user:', userId)

  try {
    // Step 1: Cancel any active Stripe subscriptions
    await cancelStripeSubscriptions(user.email)

    // Step 2: Delete user data using the database function (if available)
    try {
      const { error: rpcError } = await supabaseAdmin.rpc('delete_user_account', {
        user_id: userId
      })

      if (rpcError && !rpcError.message.includes('Could not find the function')) {
        throw rpcError
      }
    } catch (rpcError) {
      console.log('BMad Method: Database function not available, proceeding with direct deletion')
      // If function doesn't exist, we'll still delete the auth user
    }

    // Step 3: Create audit log entry
    await createDeletionAuditLog(supabaseAdmin, userId, 'immediate', reason, user.email)

    // Step 4: Delete from Supabase auth (this will cascade delete related data)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (deleteError) {
      throw new Error(`Failed to delete user from auth: ${deleteError.message}`)
    }

    console.log('BMad Method: Immediate account deletion completed for user:', userId)

  } catch (error) {
    console.error('BMad Method: Error during immediate deletion:', error)
    throw error
  }
}

async function performAccountDeactivation(
  supabaseAdmin: any,
  userId: string,
  user: any,
  reason?: string
) {
  console.log('BMad Method: Starting account deactivation for user:', userId)

  try {
    // Step 1: Mark account as deleted in user profiles (soft delete)
    const { error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update({
        deleted_at: new Date().toISOString(),
        status: 'deleted',
        deletion_reason: reason,
        // Anonymize email for privacy while keeping user_id for clinical data
        anonymized_email: `deleted_${Date.now()}@anonymous.local`
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating user profile:', updateError)
      // Continue even if this fails - the auth deletion is more important
    }

    // Step 2: Temporarily disable auth account (user can't log in)
    const { error: disableError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        email: `deleted_${Date.now()}@disabled.local`,
        email_confirm: false,
        banned_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }
    )

    if (disableError) {
      throw new Error(`Failed to disable user account: ${disableError.message}`)
    }

    // Step 3: Pause Stripe subscriptions (don't cancel yet - user might recover)
    await pauseStripeSubscriptions(user.email)

    // Step 4: Create audit log
    await createDeletionAuditLog(supabaseAdmin, userId, 'deactivate', reason, user.email)

    console.log('BMad Method: Account deactivation completed for user:', userId)

  } catch (error) {
    console.error('BMad Method: Error during account deactivation:', error)
    throw error
  }
}

async function cancelStripeSubscriptions(email: string) {
  try {
    // Import Stripe functions - only if we have Stripe configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      console.log('BMad Method: Stripe not configured, skipping subscription cancellation')
      return
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(stripeSecretKey)

    // Find customer by email
    const customers = await stripe.customers.list({
      email,
      limit: 1
    })

    if (customers.data.length === 0) {
      console.log('BMad Method: No Stripe customer found for email:', email)
      return
    }

    const customer = customers.data[0]

    // Cancel all active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active'
    })

    for (const subscription of subscriptions.data) {
      await stripe.subscriptions.cancel(subscription.id, {
        prorate: true,
        invoice_now: true
      })
      console.log('BMad Method: Cancelled subscription:', subscription.id)
    }

  } catch (error) {
    console.error('BMad Method: Error cancelling Stripe subscriptions:', error)
    // Don't throw - account deletion should continue even if Stripe fails
  }
}

async function pauseStripeSubscriptions(email: string) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) return

    const Stripe = require('stripe')
    const stripe = new Stripe(stripeSecretKey)

    const customers = await stripe.customers.list({
      email,
      limit: 1
    })

    if (customers.data.length === 0) return

    const customer = customers.data[0]
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active'
    })

    for (const subscription of subscriptions.data) {
      await stripe.subscriptions.update(subscription.id, {
        pause_collection: {
          behavior: 'keep_as_draft'
        }
      })
      console.log('BMad Method: Paused subscription for recovery:', subscription.id)
    }

  } catch (error) {
    console.error('BMad Method: Error pausing Stripe subscriptions:', error)
  }
}

async function createDeletionAuditLog(
  supabaseAdmin: any,
  userId: string,
  deletionType: string,
  reason: string | undefined,
  email: string
) {
  try {
    // Create audit log entry (you may need to create this table)
    const auditData = {
      user_id: userId,
      event_type: 'account_deletion',
      deletion_type: deletionType,
      reason: reason || 'No reason provided',
      email: email,
      timestamp: new Date().toISOString(),
      metadata: {
        hipaa_relevant: true,
        retention_required_until: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000).toISOString() // 7 years
      }
    }

    // If audit table exists, insert the log
    const { error } = await supabaseAdmin
      .from('account_deletion_audit')
      .insert([auditData])

    if (error) {
      console.error('BMad Method: Failed to create audit log (table may not exist):', error)
      // Log to console for now
      console.log('BMad Method: Audit Log Entry:', auditData)
    }

  } catch (error) {
    console.error('BMad Method: Error creating audit log:', error)
  }
}