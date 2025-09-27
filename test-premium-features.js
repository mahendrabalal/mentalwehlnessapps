const { chromium } = require('playwright');

async function testPremiumFeatures() {
  console.log('🏥 Starting Premium Wellness Features Test...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slow down for visibility
  });

  const page = await browser.newPage();

  try {
    // Step 1: Navigate directly to dashboard (you mentioned localhost:3000)
    console.log('📍 Navigating directly to dashboard...');
    await page.goto('http://localhost:3000/dashboard');

    // Check if we need to login first
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/login') || currentUrl.includes('/login')) {
      console.log('🔐 Login required, logging in...');
      await page.fill('input[type="email"]', 'mahenbalal@gmail.com');
      await page.fill('input[type="password"]', 'pokhara55AB*');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000); // Wait for redirect
    }

    // Try localhost:3001 if 3000 fails
    if (!currentUrl.includes('/dashboard')) {
      console.log('📍 Trying localhost:3001...');
      await page.goto('http://localhost:3001/dashboard');
      await page.waitForTimeout(2000);
    }

    // Step 3: Find Premium section
    console.log('📊 Locating Premium Wellness Features section...');
    await page.waitForLoadState('networkidle');

    // Look for Premium section
    const premiumSection = await page.locator('text=Unlock Premium Wellness Features').first();
    if (await premiumSection.isVisible()) {
      console.log('✅ Premium Wellness Features section found!');

      // Screenshot the section
      await page.screenshot({ path: 'premium-features-section.png', fullPage: true });
      console.log('📸 Screenshot saved as premium-features-section.png');

      // Check the 3 features
      const aiCompanion = await page.locator('text=24/7 AI Companion').isVisible();
      const smartAnalytics = await page.locator('text=Smart Analytics').isVisible();
      const premiumContent = await page.locator('text=Premium Content').isVisible();

      console.log('🤖 AI Companion feature:', aiCompanion ? '✅ Found' : '❌ Not found');
      console.log('📊 Smart Analytics feature:', smartAnalytics ? '✅ Found' : '❌ Not found');
      console.log('🎵 Premium Content feature:', premiumContent ? '✅ Found' : '❌ Not found');

      // Check pricing
      const pricing = await page.locator('text=$19.99/month').isVisible();
      console.log('💰 Pricing display:', pricing ? '✅ Found' : '❌ Not found');

      // Check Start Free Trial button
      const trialButton = await page.locator('text=Start Free Trial').first();
      if (await trialButton.isVisible()) {
        console.log('🎯 Start Free Trial button found!');

        // Click the button to test modal
        console.log('🖱️ Clicking Start Free Trial button...');
        await trialButton.click();

        // Wait for modal to appear
        await page.waitForTimeout(2000);

        // Check if modal opened
        const modal = await page.locator('[role="dialog"], .modal, .fixed.inset-0').first();
        if (await modal.isVisible()) {
          console.log('✅ Premium upgrade modal opened successfully!');

          // Screenshot the modal
          await page.screenshot({ path: 'premium-modal.png', fullPage: true });
          console.log('📸 Modal screenshot saved as premium-modal.png');

          // Check for pricing plans in modal
          const monthlyPlan = await page.locator('text=Premium Monthly').isVisible();
          const yearlyPlan = await page.locator('text=Premium Yearly').isVisible();

          console.log('📅 Monthly plan:', monthlyPlan ? '✅ Found' : '❌ Not found');
          console.log('📅 Yearly plan:', yearlyPlan ? '✅ Found' : '❌ Not found');

          // Check for healthcare disclaimer
          const disclaimer = await page.locator('text=not a substitute for professional therapy').isVisible();
          console.log('⚕️ Healthcare disclaimer:', disclaimer ? '✅ Found' : '❌ Not found');

        } else {
          console.log('❌ Modal did not open');
        }
      } else {
        console.log('❌ Start Free Trial button not found');
      }

    } else {
      console.log('❌ Premium Wellness Features section not found');
    }

    // Keep browser open for 30 seconds for manual inspection
    console.log('🔍 Browser will stay open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('✅ Test completed');
  }
}

testPremiumFeatures();