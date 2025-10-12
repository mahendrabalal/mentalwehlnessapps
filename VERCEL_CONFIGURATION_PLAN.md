# Vercel Configuration Plan for Turbo Monorepo

## Overview
This document outlines the necessary updates to optimize your Vercel configuration for the Turbo monorepo setup in your mental wellness apps project.

## Current State Analysis
- You've recently updated the root `vercel.json` to use the Turbo build command from the root level
- You've removed the `rootDirectory` setting to let Vercel detect the Turbo monorepo automatically
- You've kept the correct output directory for the Next.js app (`apps/web/.next`)
- There's a redundant Vercel configuration file in `apps/web/vercel.json` that should be removed
- The functions configuration for API routes was removed but is needed for proper deployment

## Recommended Changes

### 1. Update Root Vercel Configuration
The root `vercel.json` should be updated to include:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "apps/web/pages/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2. Remove Redundant Configuration
Delete the `apps/web/vercel.json` file as it's redundant and could cause conflicts.

### 3. Environment Variables
Ensure all necessary environment variables are configured in Vercel:

#### Core Application Variables
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_URL` (your deployed URL)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

#### Authentication & Security
- `APP_ENCRYPTION_KEY`
- `JWT_SECRET`
- `SESSION_SECRET`

#### Payment Processing
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

#### CMS Integration
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_PREVIEW_TOKEN`
- `SANITY_REVALIDATE_SECRET`

## Deployment Flow
1. Vercel detects the Turbo monorepo structure
2. Runs `npm run build` which triggers Turbo to build all workspaces
3. Builds the web app with output to `apps/web/.next`
4. Deploys API routes as serverless functions
5. Configures environment variables for production

## Testing Recommendations
1. Run `npm run build` locally to ensure it works with the new configuration
2. Test API routes after deployment
3. Verify authentication flows work correctly
4. Test payment processing with Stripe webhooks
5. Validate CMS preview functionality

## Additional Considerations
- Ensure your production database is properly configured
- Set up monitoring and error tracking (Sentry)
- Configure backup and disaster recovery
- Set up compliance monitoring for HIPAA requirements
- Implement proper logging for production debugging

## Next Steps
1. Update the root Vercel configuration
2. Remove the redundant configuration file
3. Test the build process locally
4. Deploy to a preview environment
5. Conduct full testing before production deployment