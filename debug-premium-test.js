const { chromium } = require('playwright');

async function debugPremiumFeatures() {
  console.log('🏥 Debug Premium Wellness Features Test...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const page = await browser.newPage();

  try {
    // Test both ports
    const ports = [3000, 3001];

    for (const port of ports) {
      console.log(`\n📍 Testing port ${port}...`);

      try {
        // Navigate to auth/login first
        await page.goto(`http://localhost:${port}/auth/login`);
        await page.waitForLoadState('networkidle', { timeout: 5000 });

        console.log(`✅ Port ${port} is accessible`);

        // Login
        console.log('🔐 Attempting login...');
        await page.fill('input[name="email"], input[type="email"]', 'mahenbalal@gmail.com');
        await page.fill('input[name="password"], input[type="password"]', 'pokhara55AB*');

        // Find and click login button
        const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Log In"), button:has-text("Login")').first();
        await loginButton.click();

        // Wait for navigation
        await page.waitForTimeout(3000);

        // Navigate to dashboard
        console.log('📊 Navigating to dashboard...');
        await page.goto(`http://localhost:${port}/dashboard`);
        await page.waitForLoadState('networkidle', { timeout: 10000 });

        // Take screenshot for debugging
        await page.screenshot({ path: `dashboard-port-${port}.png`, fullPage: true });
        console.log(`📸 Dashboard screenshot saved as dashboard-port-${port}.png`);

        // Debug: Print page content
        console.log('📋 Page title:', await page.title());
        console.log('📋 Current URL:', page.url());

        // Look for Premium section with various selectors
        const selectors = [
          'text=Unlock Premium Wellness Features',
          'text=Premium Wellness Features',
          'text=Premium Features',
          'text=24/7 AI Companion',
          'text=Smart Analytics',
          'text=Premium Content',
          'text=Start Free Trial',
          '[class*="gradient"]'
        ];

        let found = false;
        for (const selector of selectors) {
          const element = page.locator(selector).first();
          const visible = await element.isVisible().catch(() => false);
          if (visible) {
            console.log(`✅ Found element with selector: ${selector}`);
            found = true;
          } else {
            console.log(`❌ Not found: ${selector}`);
          }
        }

        if (found) {
          console.log(`🎉 Premium features found on port ${port}!`);

          // Test clicking Start Free Trial button
          const trialButton = page.locator('text=Start Free Trial').first();
          if (await trialButton.isVisible()) {
            console.log('🖱️ Clicking Start Free Trial...');
            await trialButton.click();
            await page.waitForTimeout(3000);

            // Check for modal
            const modal = await page.locator('[role="dialog"], .modal, .fixed').first().isVisible().catch(() => false);
            console.log('📋 Modal opened:', modal ? '✅ Yes' : '❌ No');

            if (modal) {
              await page.screenshot({ path: `modal-port-${port}.png`, fullPage: true });
              console.log(`📸 Modal screenshot saved as modal-port-${port}.png`);
            }
          }

          // Keep browser open for manual inspection
          console.log('🔍 Browser staying open for 60 seconds...');
          await page.waitForTimeout(60000);

          break; // Exit loop if found
        } else {
          console.log(`❌ Premium features not found on port ${port}`);
        }

      } catch (error) {
        console.log(`❌ Port ${port} failed:`, error.message);
        continue;
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('✅ Test completed');
  }
}

debugPremiumFeatures();