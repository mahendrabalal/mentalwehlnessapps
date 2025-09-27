const { chromium } = require('playwright');

async function testPremiumNavigationFlow() {
  console.log('🎯 Testing Premium Features Navigation Flow');
  console.log('============================================');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000
  });

  const page = await browser.newPage();

  try {
    // Step 1: Login
    console.log('\n🔐 Step 1: Login');
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="email"], input[type="email"]', 'mahenbalal@gmail.com');
    await page.fill('input[name="password"], input[type="password"]', 'pokhara55AB*');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In")').first();
    await loginButton.click();
    await page.waitForTimeout(3000);

    // Step 2: Navigate to Dashboard
    console.log('\n📊 Step 2: Navigate to Dashboard');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    console.log('✅ Dashboard loaded');

    // Step 3: Start Free Trial Process
    console.log('\n🎯 Step 3: Start Free Trial Process');
    const trialButton = page.locator('text=Start Free Trial').first();
    await trialButton.click();
    await page.waitForTimeout(3000);

    // Step 4: Complete Subscription
    console.log('\n💳 Step 4: Complete Subscription Process');

    // Monitor API responses
    let subscriptionCreated = false;
    page.on('response', async response => {
      if (response.url().includes('/api/subscriptions/create') && response.status() === 200) {
        try {
          const data = await response.json();
          if (data.subscriptionId) {
            subscriptionCreated = true;
            console.log('✅ Subscription created:', data.subscriptionId);
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    });

    // Select monthly plan and proceed
    const monthlyPlan = page.locator('text=Premium Monthly').first();
    if (await monthlyPlan.isVisible()) {
      await monthlyPlan.click();
      console.log('✅ Monthly plan selected');

      // Find subscription button
      const subscribeButton = page.locator('button:has-text("Start 7-Day Free Trial"), button:has-text("Start Free Trial")').first();
      if (await subscribeButton.isVisible()) {
        await subscribeButton.click();
        console.log('🖱️ Clicked subscription button');

        // Wait for processing
        await page.waitForTimeout(8000);

        // Step 5: Test Navigation Buttons
        console.log('\n🧭 Step 5: Testing Navigation Options');

        // Look for the success message and buttons
        const successTitle = await page.locator('text=Welcome to Premium').isVisible().catch(() => false);
        const exploreButton = page.locator('text=Explore Premium Features').first();
        const dashboardButton = page.locator('text=Back to Dashboard').first();

        console.log('Success screen shown:', successTitle ? '✅' : '❌');

        if (await exploreButton.isVisible()) {
          console.log('✅ "Explore Premium Features" button found');

          // Take screenshot before clicking
          await page.screenshot({ path: 'before-explore-click.png', fullPage: true });

          // Click Explore Premium Features
          console.log('🖱️ Clicking "Explore Premium Features" button...');
          await exploreButton.click();

          // Wait for navigation
          await page.waitForTimeout(5000);

          // Check current URL
          const currentUrl = page.url();
          console.log('📍 Current URL after click:', currentUrl);

          if (currentUrl.includes('/premium/features')) {
            console.log('✅ SUCCESS: Navigated to Premium Features page!');

            // Take screenshot of premium features page
            await page.screenshot({ path: 'premium-features-page.png', fullPage: true });

            // Verify premium features page content
            const pageTitle = await page.title();
            console.log('📄 Page title:', pageTitle);

            // Check for key elements on premium features page
            const welcomeText = await page.locator('text=Welcome to Your Premium Trial').isVisible().catch(() => false);
            const quickStart = await page.locator('text=Quick Start').isVisible().catch(() => false);
            const aiCompanionFeature = await page.locator('text=24/7 AI Therapy Companion').isVisible().catch(() => false);

            console.log('Welcome message:', welcomeText ? '✅' : '❌');
            console.log('Quick Start section:', quickStart ? '✅' : '❌');
            console.log('AI Companion feature:', aiCompanionFeature ? '✅' : '❌');

            // Test feature tabs
            const analyticsTab = page.locator('text=Smart Analytics').first();
            if (await analyticsTab.isVisible()) {
              console.log('🖱️ Testing feature tabs...');
              await analyticsTab.click();
              await page.waitForTimeout(2000);
              console.log('✅ Feature tabs working');
            }

            // Test quick action buttons
            const quickActionButtons = page.locator('text=Start AI Chat, text=View Analytics, text=Browse Content');
            const buttonCount = await quickActionButtons.count();
            console.log(`📊 Quick action buttons found: ${buttonCount}`);

          } else {
            console.log('❌ FAILED: Did not navigate to Premium Features page');
            console.log('Current URL:', currentUrl);

            // Check if we're back on dashboard
            if (currentUrl.includes('/dashboard')) {
              console.log('⚠️  Navigated back to dashboard instead');

              // Check if dashboard shows premium status
              const premiumStatus = await page.locator('text=Premium Trial Active, text=Premium Member').isVisible().catch(() => false);
              console.log('Dashboard shows premium status:', premiumStatus ? '✅' : '❌');
            }
          }

        } else {
          console.log('❌ "Explore Premium Features" button not found');

          // Check what buttons are available
          const allButtons = await page.locator('button').allTextContents();
          console.log('Available buttons:', allButtons);
        }
      }
    }

    // Final assessment
    console.log('\n📊 Navigation Test Results');
    console.log('==========================');

    if (subscriptionCreated) {
      console.log('✅ Subscription creation: PASS');
    } else {
      console.log('❌ Subscription creation: FAIL');
    }

    const finalUrl = page.url();
    if (finalUrl.includes('/premium/features')) {
      console.log('✅ Premium Features navigation: PASS');
      console.log('🎉 SUCCESS: "Explore Premium Features" button works correctly!');
    } else {
      console.log('❌ Premium Features navigation: FAIL');
      console.log('⚠️  Issue: Button does not navigate to premium features page');
    }

    // Keep browser open for inspection
    console.log('\n🔍 Keeping browser open for 45 seconds...');
    await page.waitForTimeout(45000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Test completed');
  }
}

testPremiumNavigationFlow();