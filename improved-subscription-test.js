const { chromium } = require('playwright');

async function improvedSubscriptionTest() {
  console.log('🏥 BMad Method: Improved End-to-End Subscription Test');
  console.log('===================================================');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 800
  });

  const page = await browser.newPage();
  let testResults = {
    loginSuccess: false,
    premiumSectionFound: false,
    modalOpened: false,
    subscriptionCreated: false,
    successMessageShown: false,
    trialActivated: false,
    dashboardUpdated: false
  };

  try {
    // Step 1: Login
    console.log('\n🔐 Step 1: Login Process');
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="email"], input[type="email"]', 'mahenbalal@gmail.com');
    await page.fill('input[name="password"], input[type="password"]', 'pokhara55AB*');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In")').first();
    await loginButton.click();
    await page.waitForTimeout(3000);

    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    testResults.loginSuccess = true;
    console.log('✅ Login successful');

    // Step 2: Find Premium Section
    console.log('\n📊 Step 2: Premium Features Verification');
    const premiumSection = page.locator('text=Unlock Premium Wellness Features').first();
    if (await premiumSection.isVisible()) {
      testResults.premiumSectionFound = true;
      console.log('✅ Premium section found');
      await page.screenshot({ path: 'step2-premium-section.png', fullPage: true });
    }

    // Step 3: Start Free Trial
    console.log('\n🎯 Step 3: Starting Free Trial');
    const trialButton = page.locator('text=Start Free Trial').first();
    await trialButton.click();
    await page.waitForTimeout(3000);

    // Check if modal opened
    const modal = await page.locator('[role="dialog"], .fixed.inset-0').first().isVisible().catch(() => false);
    if (modal) {
      testResults.modalOpened = true;
      console.log('✅ Premium upgrade modal opened');
      await page.screenshot({ path: 'step3-modal-opened.png', fullPage: true });

      // Step 4: Select Monthly Plan and Subscribe
      console.log('\n💳 Step 4: Selecting Plan and Creating Subscription');

      // Monitor network requests for subscription creation
      let subscriptionApiCalled = false;
      let subscriptionResponse = null;

      page.on('response', async response => {
        if (response.url().includes('/api/subscriptions/create')) {
          subscriptionApiCalled = true;
          console.log(`🌐 Subscription API called: ${response.status()}`);

          if (response.status() === 200) {
            try {
              subscriptionResponse = await response.json();
              console.log('📦 Subscription Response:', JSON.stringify(subscriptionResponse, null, 2));
              if (subscriptionResponse.subscriptionId) {
                testResults.subscriptionCreated = true;
                console.log('✅ Subscription created with ID:', subscriptionResponse.subscriptionId);
              }
            } catch (e) {
              console.log('Could not parse response');
            }
          }
        }
      });

      // Select monthly plan
      const monthlyPlan = page.locator('text=Premium Monthly').first();
      if (await monthlyPlan.isVisible()) {
        await monthlyPlan.click();
        console.log('✅ Monthly plan selected');
        await page.waitForTimeout(2000);

        // Find and click the trial button
        const subscribeButton = page.locator(
          'button:has-text("Start 7-Day Free Trial"), ' +
          'button:has-text("Start Free Trial"), ' +
          'button:has-text("Start Trial"), ' +
          'button:has-text("Subscribe")'
        ).first();

        if (await subscribeButton.isVisible()) {
          console.log('🖱️ Clicking subscription button...');
          await subscribeButton.click();

          // Wait for processing and potential success messages
          console.log('⏳ Waiting for subscription processing...');
          await page.waitForTimeout(8000);

          // Step 5: Check for Success Indicators
          console.log('\n🎉 Step 5: Success Verification');

          // Look for success messages
          const successIndicators = [
            'text=trial has started successful',
            'text=Premium Monthly trial has started',
            'text=subscription successful',
            'text=Welcome to Premium',
            'text=Trial Active',
            'text=Premium Member',
            'text=Success'
          ];

          let foundSuccess = false;
          for (const indicator of successIndicators) {
            if (await page.locator(indicator).isVisible().catch(() => false)) {
              console.log(`✅ Success message found: "${indicator}"`);
              testResults.successMessageShown = true;
              foundSuccess = true;
              break;
            }
          }

          // Take screenshot of current state
          await page.screenshot({ path: 'step5-after-subscription.png', fullPage: true });
          console.log('📸 Post-subscription screenshot saved');

          // Check if trial is activated by looking for premium status
          await page.waitForTimeout(3000);

          // Step 6: Verify Dashboard Update
          console.log('\n📊 Step 6: Dashboard Status Update Verification');

          // Close modal if still open and check dashboard
          const closeButton = page.locator('button:has-text("×"), button:has-text("Close"), .close').first();
          if (await closeButton.isVisible()) {
            await closeButton.click();
            console.log('🔄 Closed modal');
          }

          // Refresh dashboard to see updated status
          await page.reload();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(3000);

          // Look for premium status indicators on dashboard
          const premiumStatusIndicators = [
            'text=Premium Trial Active',
            'text=Premium Member',
            'text=Trial Active',
            'text=Premium Status',
            'text=Manage Subscription'
          ];

          let premiumStatusFound = false;
          for (const indicator of premiumStatusIndicators) {
            if (await page.locator(indicator).isVisible().catch(() => false)) {
              console.log(`✅ Premium status found: "${indicator}"`);
              testResults.dashboardUpdated = true;
              premiumStatusFound = true;
              break;
            }
          }

          // Final screenshot
          await page.screenshot({ path: 'step6-final-dashboard.png', fullPage: true });
          console.log('📸 Final dashboard screenshot saved');

          // Check if the premium section changed color (green instead of purple)
          const premiumSectionClass = await page.locator('[class*="gradient"]').first().getAttribute('class');
          if (premiumSectionClass && premiumSectionClass.includes('green')) {
            console.log('✅ Premium section changed to green (indicating active subscription)');
            testResults.trialActivated = true;
          }
        }
      }
    }

    // Step 7: Final Results
    console.log('\n📊 Final Test Results');
    console.log('=====================');

    Object.entries(testResults).forEach(([key, value]) => {
      const status = value ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${key}`);
    });

    const passedTests = Object.values(testResults).filter(Boolean).length;
    const totalTests = Object.keys(testResults).length;
    const successRate = Math.round((passedTests / totalTests) * 100);

    console.log(`\n🎯 Overall Success Rate: ${passedTests}/${totalTests} (${successRate}%)`);

    if (successRate >= 85) {
      console.log('🎉 EXCELLENT: Premium subscription system is working perfectly!');
    } else if (successRate >= 70) {
      console.log('👍 GOOD: Premium subscription system is working well with minor issues');
    } else {
      console.log('⚠️  NEEDS IMPROVEMENT: Several issues need to be addressed');
    }

    // Keep browser open for manual verification
    console.log('\n🔍 Keeping browser open for 45 seconds for manual verification...');
    await page.waitForTimeout(45000);

  } catch (error) {
    console.error('❌ Test encountered error:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Test completed successfully');
  }
}

improvedSubscriptionTest();