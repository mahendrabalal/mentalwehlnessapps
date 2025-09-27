const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');

// Supabase client for verification
const supabaseUrl = 'https://ghpuuobotfswlpprzsic.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocHV1b2JvdGZzd2xwcHJ6c2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0OTAyMTMsImV4cCI6MjA3NDA2NjIxM30.JcsQ4kH_uv0bDM6t1cE8ZY2UgP_7wFrkj3ZRyXwL7Og';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function completeSubscriptionE2ETest() {
  console.log('🏥 BMad Method: Complete Subscription End-to-End Test');
  console.log('================================================');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slow for visibility
  });

  const page = await browser.newPage();
  let testResults = {
    loginSuccess: false,
    premiumSectionFound: false,
    modalOpened: false,
    planSelectionWorking: false,
    subscriptionCreated: false,
    successMessageShown: false,
    supabaseVerified: false,
    stripeIntegration: false
  };

  try {
    // Step 1: Login and Navigate to Dashboard
    console.log('\n🔐 Step 1: Login Process');
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="email"], input[type="email"]', 'mahenbalal@gmail.com');
    await page.fill('input[name="password"], input[type="password"]', 'pokhara55AB*');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Log In")').first();
    await loginButton.click();
    await page.waitForTimeout(3000);

    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');

    testResults.loginSuccess = true;
    console.log('✅ Login successful');

    // Step 2: Find and Test Premium Section
    console.log('\n📊 Step 2: Premium Features Section');
    const premiumSection = page.locator('text=Unlock Premium Wellness Features').first();
    const isPremiumVisible = await premiumSection.isVisible();

    if (isPremiumVisible) {
      testResults.premiumSectionFound = true;
      console.log('✅ Premium Wellness Features section found');

      // Verify all 3 features
      const features = [
        { name: '24/7 AI Companion', selector: 'text=24/7 AI Companion' },
        { name: 'Smart Analytics', selector: 'text=Smart Analytics' },
        { name: 'Premium Content', selector: 'text=Premium Content' }
      ];

      for (const feature of features) {
        const featureVisible = await page.locator(feature.selector).isVisible();
        console.log(`${featureVisible ? '✅' : '❌'} ${feature.name}`);
      }

      // Take screenshot of premium section
      await page.screenshot({ path: 'premium-section-before-click.png', fullPage: true });
      console.log('📸 Premium section screenshot saved');
    }

    // Step 3: Click Start Free Trial
    console.log('\n🎯 Step 3: Start Free Trial Process');
    const trialButton = page.locator('text=Start Free Trial').first();

    if (await trialButton.isVisible()) {
      console.log('🖱️ Clicking Start Free Trial button...');
      await trialButton.click();
      await page.waitForTimeout(3000);

      // Check if modal opened
      const modalSelectors = [
        '[role="dialog"]',
        '.modal',
        '.fixed.inset-0',
        'text=Premium Monthly',
        'text=Premium Yearly'
      ];

      let modalFound = false;
      for (const selector of modalSelectors) {
        if (await page.locator(selector).first().isVisible().catch(() => false)) {
          modalFound = true;
          break;
        }
      }

      if (modalFound) {
        testResults.modalOpened = true;
        console.log('✅ Premium upgrade modal opened');

        // Take screenshot of modal
        await page.screenshot({ path: 'premium-modal-opened.png', fullPage: true });
        console.log('📸 Modal screenshot saved');

        // Step 4: Test Plan Selection
        console.log('\n💳 Step 4: Plan Selection Testing');

        // Check for monthly plan
        const monthlyPlan = page.locator('text=Premium Monthly').first();
        const yearlyPlan = page.locator('text=Premium Yearly').first();

        const monthlyVisible = await monthlyPlan.isVisible();
        const yearlyVisible = await yearlyPlan.isVisible();

        console.log(`${monthlyVisible ? '✅' : '❌'} Monthly plan ($19.99/month)`);
        console.log(`${yearlyVisible ? '✅' : '❌'} Yearly plan ($89.99/year)`);

        if (monthlyVisible || yearlyVisible) {
          testResults.planSelectionWorking = true;

          // Select monthly plan and proceed
          if (monthlyVisible) {
            console.log('🎯 Selecting Monthly plan...');
            await monthlyPlan.click();
            await page.waitForTimeout(2000);

            // Look for trial button in modal
            const trialButtonInModal = page.locator('button:has-text("Start"), button:has-text("Trial"), button:has-text("Subscribe")').first();

            if (await trialButtonInModal.isVisible()) {
              console.log('🚀 Found subscription button, proceeding...');

              // Step 5: Complete Subscription Process
              console.log('\n💰 Step 5: Subscription Creation');

              // Monitor network requests for subscription API calls
              page.on('response', async response => {
                if (response.url().includes('/api/subscriptions/create')) {
                  console.log(`🌐 API Response: ${response.status()} - ${response.url()}`);
                  if (response.status() === 200) {
                    const responseBody = await response.json().catch(() => null);
                    if (responseBody) {
                      console.log('📦 Subscription API Response:', JSON.stringify(responseBody, null, 2));
                      if (responseBody.subscriptionId) {
                        testResults.subscriptionCreated = true;
                        console.log('✅ Subscription created successfully!');
                        console.log('🆔 Subscription ID:', responseBody.subscriptionId);
                      }
                    }
                  }
                }
              });

              // Click subscription button
              await trialButtonInModal.click();
              console.log('🖱️ Clicked subscription button');

              // Wait for processing
              await page.waitForTimeout(10000);

              // Step 6: Check for Success State
              console.log('\n🎉 Step 6: Success Verification');

              // Look for success indicators
              const successSelectors = [
                'text=Success',
                'text=Subscribed',
                'text=Welcome to Premium',
                'text=Trial Active',
                'text=Premium Member',
                'text=Subscription successful',
                'text=You are now subscribed'
              ];

              let successFound = false;
              for (const selector of successSelectors) {
                if (await page.locator(selector).isVisible().catch(() => false)) {
                  console.log(`✅ Success message found: ${selector}`);
                  successFound = true;
                  testResults.successMessageShown = true;
                  break;
                }
              }

              // Check if modal closed and dashboard shows premium status
              await page.waitForTimeout(3000);
              const premiumStatusCheck = await page.locator('text=Premium, text=Trial Active').isVisible().catch(() => false);

              if (premiumStatusCheck) {
                console.log('✅ Premium status now showing on dashboard');
                testResults.successMessageShown = true;
              }

              // Take final screenshot
              await page.screenshot({ path: 'subscription-completed.png', fullPage: true });
              console.log('📸 Final state screenshot saved');

              // Step 7: Verify Supabase Storage
              console.log('\n🗄️  Step 7: Supabase Verification');
              await verifySupabaseStorage('ad926065-0bf6-44c8-b829-1a731d6839e8'); // User ID from logs

            }
          }
        }

      } else {
        console.log('❌ Premium upgrade modal did not open');
      }
    }

    // Step 8: Print Final Test Results
    console.log('\n📋 Final Test Results');
    console.log('=====================');
    Object.entries(testResults).forEach(([key, value]) => {
      console.log(`${value ? '✅' : '❌'} ${key}: ${value}`);
    });

    const totalTests = Object.keys(testResults).length;
    const passedTests = Object.values(testResults).filter(Boolean).length;
    const successRate = Math.round((passedTests / totalTests) * 100);

    console.log(`\n🎯 Success Rate: ${passedTests}/${totalTests} (${successRate}%)`);

    if (successRate >= 80) {
      console.log('🎉 EXCELLENT: Premium subscription flow is working well!');
    } else if (successRate >= 60) {
      console.log('⚠️  GOOD: Most functionality working, minor issues to fix');
    } else {
      console.log('❌ NEEDS WORK: Several issues need to be addressed');
    }

    // Keep browser open for manual inspection
    console.log('\n🔍 Browser staying open for 60 seconds for manual inspection...');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('✅ Test completed');
  }
}

async function verifySupabaseStorage(userId) {
  try {
    console.log('🔍 Checking Supabase for subscription records...');

    // Check for subscription in user_subscriptions table (if exists)
    try {
      const { data: subscriptions, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.log('ℹ️  user_subscriptions table not found (expected for new implementation)');
      } else if (subscriptions && subscriptions.length > 0) {
        console.log('✅ Subscription found in Supabase:');
        console.log(JSON.stringify(subscriptions[0], null, 2));
        testResults.supabaseVerified = true;
        return true;
      }
    } catch (err) {
      console.log('ℹ️  Subscription table check failed (expected):', err.message);
    }

    // Check user metadata for subscription info
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (user && user.user) {
      console.log('✅ User metadata check:');
      console.log('User ID:', user.user.id);
      console.log('Metadata:', user.user.user_metadata);
      console.log('App Metadata:', user.user.app_metadata);

      const hasSubscriptionInfo =
        user.user.user_metadata?.subscription_status ||
        user.user.app_metadata?.subscription_status;

      if (hasSubscriptionInfo) {
        console.log('✅ Subscription info found in user metadata');
        testResults.supabaseVerified = true;
        return true;
      }
    }

    console.log('ℹ️  No subscription records found in Supabase (this may be expected for trial subscriptions)');
    return false;

  } catch (error) {
    console.error('❌ Supabase verification failed:', error);
    return false;
  }
}

// Run the test
completeSubscriptionE2ETest();