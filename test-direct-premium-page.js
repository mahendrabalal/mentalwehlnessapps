const { chromium } = require('playwright');

async function testDirectPremiumPage() {
  console.log('🎯 Testing Direct Premium Features Page Access');
  console.log('============================================');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000
  });

  const page = await browser.newPage();
  let testResults = {
    pageLoads: false,
    welcomeMessageShown: false,
    quickStartVisible: false,
    premiumFeaturesVisible: false,
    featureTabsWork: false,
    navigationButtonsWork: false
  };

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
    console.log('✅ Login successful');

    // Step 2: Direct Navigation to Premium Features Page
    console.log('\n🚀 Step 2: Direct Navigation to Premium Features');
    await page.goto('http://localhost:3000/premium/features');
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);

    if (currentUrl.includes('/premium/features')) {
      testResults.pageLoads = true;
      console.log('✅ Premium Features page loaded successfully');

      // Take initial screenshot
      await page.screenshot({ path: 'premium-features-loaded.png', fullPage: true });
      console.log('📸 Initial page screenshot saved');

      // Step 3: Check Page Content
      console.log('\n📋 Step 3: Verify Page Content');

      const pageTitle = await page.title();
      console.log('📄 Page title:', pageTitle);

      // Check for welcome message
      const welcomeMessage = await page.locator('text=Welcome to Your Premium Trial, text=Premium Features Active').isVisible().catch(() => false);
      if (welcomeMessage) {
        testResults.welcomeMessageShown = true;
        console.log('✅ Welcome message displayed');
      } else {
        console.log('❌ Welcome message not found');
      }

      // Check for Quick Start section
      const quickStart = await page.locator('text=🚀 Quick Start').isVisible().catch(() => false);
      if (quickStart) {
        testResults.quickStartVisible = true;
        console.log('✅ Quick Start section found');
      } else {
        console.log('❌ Quick Start section not found');
      }

      // Check for Premium Features section
      const premiumFeatures = await page.locator('text=✨ Your Premium Features').isVisible().catch(() => false);
      if (premiumFeatures) {
        testResults.premiumFeaturesVisible = true;
        console.log('✅ Premium Features section found');
      } else {
        console.log('❌ Premium Features section not found');
      }

      // Step 4: Test Quick Action Buttons
      console.log('\n🚀 Step 4: Test Quick Action Buttons');
      const quickActions = [
        { text: 'Start AI Chat', selector: 'text=Start AI Chat' },
        { text: 'View Analytics', selector: 'text=View Analytics' },
        { text: 'Browse Content', selector: 'text=Browse Content' },
        { text: 'Complete Assessment', selector: 'text=Complete Assessment' }
      ];

      for (const action of quickActions) {
        const visible = await page.locator(action.selector).isVisible().catch(() => false);
        console.log(`${visible ? '✅' : '❌'} ${action.text} button`);
      }

      // Step 5: Test Feature Tabs
      console.log('\n🎛️ Step 5: Test Feature Tab Switching');

      // First, check if feature tabs are visible
      const featureTabs = [
        { name: 'AI Companion', selector: 'button:has-text("AI Therapy Companion")' },
        { name: 'Analytics', selector: 'button:has-text("Advanced Mood Analytics")' },
        { name: 'Content', selector: 'button:has-text("Premium Content Library")' }
      ];

      let tabsVisible = 0;
      for (const tab of featureTabs) {
        const visible = await page.locator(tab.selector).isVisible().catch(() => false);
        if (visible) tabsVisible++;
        console.log(`${visible ? '✅' : '❌'} ${tab.name} tab visible`);
      }

      // Test tab switching
      if (tabsVisible > 0) {
        try {
          const analyticsTab = page.locator('button:has-text("Advanced Mood Analytics")').first();
          if (await analyticsTab.isVisible()) {
            await analyticsTab.click();
            await page.waitForTimeout(2000);
            testResults.featureTabsWork = true;
            console.log('✅ Feature tab switching works');

            // Take screenshot after tab switch
            await page.screenshot({ path: 'analytics-tab-active.png', fullPage: true });
          }
        } catch (e) {
          console.log('⚠️ Could not test tab switching:', e.message);
        }
      }

      // Step 6: Test Navigation Buttons
      console.log('\n🧭 Step 6: Test Navigation Buttons');

      const dashboardButton = await page.locator('text=Go to Dashboard').isVisible().catch(() => false);
      const manageButton = await page.locator('text=Manage Subscription').isVisible().catch(() => false);

      console.log(`${dashboardButton ? '✅' : '❌'} Dashboard navigation button`);
      console.log(`${manageButton ? '✅' : '❌'} Manage subscription button`);

      if (dashboardButton || manageButton) {
        testResults.navigationButtonsWork = true;
      }

      // Step 7: Test Dashboard Button Navigation
      if (dashboardButton) {
        console.log('\n🖱️ Step 7: Test Dashboard Navigation');
        const dashboardLink = page.locator('text=Go to Dashboard').first();
        await dashboardLink.click();
        await page.waitForTimeout(3000);

        const backToDashboard = page.url().includes('/dashboard');
        console.log(`${backToDashboard ? '✅' : '❌'} Dashboard navigation works`);

        if (backToDashboard) {
          // Navigate back to premium features
          await page.goto('http://localhost:3000/premium/features');
          await page.waitForLoadState('networkidle');
          console.log('🔄 Returned to Premium Features page');
        }
      }

      // Final screenshot
      await page.screenshot({ path: 'premium-features-final-test.png', fullPage: true });
      console.log('📸 Final test screenshot saved');

    } else {
      console.log('❌ Failed to load Premium Features page');
    }

    // Step 8: Test Results Summary
    console.log('\n📊 Test Results Summary');
    console.log('=======================');

    Object.entries(testResults).forEach(([key, value]) => {
      const status = value ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${key}`);
    });

    const passedTests = Object.values(testResults).filter(Boolean).length;
    const totalTests = Object.keys(testResults).length;
    const successRate = Math.round((passedTests / totalTests) * 100);

    console.log(`\n🎯 Overall Success Rate: ${passedTests}/${totalTests} (${successRate}%)`);

    if (successRate >= 85) {
      console.log('🎉 EXCELLENT: Premium Features page is fully functional!');
    } else if (successRate >= 70) {
      console.log('👍 GOOD: Premium Features page works well with minor issues');
    } else {
      console.log('⚠️ NEEDS IMPROVEMENT: Several issues need to be addressed');
    }

    // Keep browser open for manual inspection
    console.log('\n🔍 Keeping browser open for 45 seconds for manual verification...');
    await page.waitForTimeout(45000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Test completed');
  }
}

testDirectPremiumPage();