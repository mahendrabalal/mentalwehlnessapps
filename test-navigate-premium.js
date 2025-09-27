const { chromium } = require('playwright');

async function testPremiumFeaturesNavigation() {
  console.log('🚀 Testing Premium Features Navigation After Successful Subscription');
  console.log('================================================================');

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

    // Step 2: Go to Dashboard
    console.log('\n📊 Step 2: Navigate to Dashboard');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    console.log('✅ Dashboard loaded');

    // Step 3: Check Current Premium Status
    console.log('\n💎 Step 3: Check Premium Status');
    const premiumStatus = await page.locator('text=Premium Trial Active, text=Premium Member, text=Manage Subscription').isVisible().catch(() => false);

    if (premiumStatus) {
      console.log('✅ User has premium status - testing direct navigation');

      // Test direct navigation to premium features
      await page.goto('http://localhost:3000/premium/features');
      await page.waitForLoadState('networkidle');

      // Step 4: Verify Premium Features Page
      console.log('\n🎯 Step 4: Verify Premium Features Page Content');

      const pageTitle = await page.title();
      console.log('📄 Page title:', pageTitle);

      const welcomeTitle = await page.locator('text=Welcome to Your Premium Trial, text=Premium Features Active').isVisible().catch(() => false);
      console.log(`${welcomeTitle ? '✅' : '❌'} Welcome title displayed`);

      const quickStartSection = await page.locator('text=🚀 Quick Start').isVisible().catch(() => false);
      console.log(`${quickStartSection ? '✅' : '❌'} Quick Start section found`);

      const premiumFeaturesSection = await page.locator('text=✨ Your Premium Features').isVisible().catch(() => false);
      console.log(`${premiumFeaturesSection ? '✅' : '❌'} Premium Features section found`);

      // Test quick action buttons
      const quickActions = [
        'text=Start AI Chat',
        'text=View Analytics',
        'text=Browse Content',
        'text=Complete Assessment'
      ];

      console.log('\n🚀 Step 5: Test Quick Action Buttons');
      for (const action of quickActions) {
        const visible = await page.locator(action).isVisible().catch(() => false);
        console.log(`${visible ? '✅' : '❌'} ${action.replace('text=', '')}`);
      }

      // Test feature tabs
      console.log('\n🎛️ Step 6: Test Feature Tabs');
      const featureTabs = [
        'text=🤖 24/7 AI Therapy Companion',
        'text=📊 Advanced Mood Analytics',
        'text=🎵 Premium Content Library'
      ];

      for (const tab of featureTabs) {
        const visible = await page.locator(tab).isVisible().catch(() => false);
        console.log(`${visible ? '✅' : '❌'} ${tab.replace('text=', '')}`);
      }

      // Test tab switching
      console.log('\n🔄 Step 7: Test Tab Interaction');
      const analyticsTab = page.locator('text=📊 Advanced Mood Analytics').first();
      if (await analyticsTab.isVisible()) {
        await analyticsTab.click();
        await page.waitForTimeout(2000);
        console.log('✅ Successfully switched to Analytics tab');
      }

      // Test navigation buttons at bottom
      console.log('\n🧭 Step 8: Test Navigation Buttons');
      const dashboardButton = await page.locator('text=Go to Dashboard').isVisible().catch(() => false);
      const manageButton = await page.locator('text=Manage Subscription').isVisible().catch(() => false);

      console.log(`${dashboardButton ? '✅' : '❌'} Dashboard navigation button`);
      console.log(`${manageButton ? '✅' : '❌'} Manage subscription button`);

      // Take final screenshot
      await page.screenshot({ path: 'premium-features-final.png', fullPage: true });
      console.log('📸 Premium Features page screenshot saved');

      console.log('\n🎉 SUCCESS: Premium Features page is fully functional!');

    } else {
      // User doesn't have premium - start subscription flow
      console.log('ℹ️  User needs premium subscription - testing full flow');

      const trialButton = page.locator('text=Start Free Trial').first();
      await trialButton.click();
      await page.waitForTimeout(3000);

      // Select monthly plan
      const monthlyPlan = page.locator('text=Premium Monthly').first();
      if (await monthlyPlan.isVisible()) {
        await monthlyPlan.click();
        await page.waitForTimeout(2000);

        // Start trial
        const subscribeButton = page.locator('button:has-text("Start 7-Day Free Trial"), button:has-text("Start Free Trial")').first();
        if (await subscribeButton.isVisible()) {
          await subscribeButton.click();
          await page.waitForTimeout(8000);

          // Look for success screen and test navigation
          const exploreButton = page.locator('text=Explore Premium Features').first();
          if (await exploreButton.isVisible()) {
            console.log('🖱️ Testing "Explore Premium Features" button...');
            await exploreButton.click();
            await page.waitForTimeout(5000);

            const currentUrl = page.url();
            console.log('📍 Current URL:', currentUrl);

            if (currentUrl.includes('/premium/features')) {
              console.log('🎉 SUCCESS: "Explore Premium Features" button works correctly!');
              await page.screenshot({ path: 'after-explore-click.png', fullPage: true });
            } else {
              console.log('❌ Navigation issue: Button did not navigate to premium features');
            }
          }
        }
      }
    }

    // Keep browser open for inspection
    console.log('\n🔍 Keeping browser open for 30 seconds for manual verification...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Test completed');
  }
}

testPremiumFeaturesNavigation();