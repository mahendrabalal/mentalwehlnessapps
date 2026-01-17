const { chromium } = require('playwright');

async function testPremiumFeatures() {
  console.log('Starting manual Premium Wellness Features testing...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000  // Slow down for better observation
  });

  const page = await browser.newPage();

  try {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log('1. Navigating to login page...');
    await page.goto('http://localhost:3001/auth/login');
    await page.waitForTimeout(3000);

    // Screenshot 1: Login page
    await page.screenshot({ path: '/tmp/claude/screenshots/01-login-page.png', fullPage: true });
    console.log('✓ Login page screenshot saved');

    console.log('2. Filling login form...');
    await page.fill('input[type="email"]', 'mahenbalal@gmail.com');
    await page.fill('input[type="password"]', 'pokhara55AB*');

    console.log('3. Submitting login...');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);

    // Screenshot 2: After login
    await page.screenshot({ path: '/tmp/claude/screenshots/02-after-login.png', fullPage: true });
    console.log('✓ After login screenshot saved');

    console.log('4. Current URL:', page.url());

    // Try to navigate to dashboard if not already there
    if (!page.url().includes('dashboard')) {
      console.log('5. Navigating to dashboard...');
      await page.goto('http://localhost:3001/dashboard');
      await page.waitForTimeout(3000);
    }

    // Screenshot 3: Dashboard
    await page.screenshot({ path: '/tmp/claude/screenshots/03-dashboard.png', fullPage: true });
    console.log('✓ Dashboard screenshot saved');

    console.log('6. Searching for premium features...');

    // Check page content
    const pageContent = await page.content();
    const hasAI = pageContent.includes('AI') || pageContent.includes('🤖');
    const hasAnalytics = pageContent.includes('Analytics') || pageContent.includes('📊');
    const hasPremium = pageContent.includes('Premium') || pageContent.includes('premium');
    const hasPricing = pageContent.includes('5.99') || pageContent.includes('$5');
    const hasTrial = pageContent.includes('Free Trial') || pageContent.includes('trial');

    console.log('Feature detection results:');
    console.log('- AI Companion:', hasAI ? '✓' : '✗');
    console.log('- Analytics:', hasAnalytics ? '✓' : '✗');
    console.log('- Premium Content:', hasPremium ? '✓' : '✗');
    console.log('- Pricing:', hasPricing ? '✓' : '✗');
    console.log('- Free Trial:', hasTrial ? '✓' : '✗');

    // Try to find and click trial button
    const trialSelectors = [
      'text=Start Free Trial',
      'text=Free Trial',
      'button:has-text("Trial")',
      'button:has-text("Premium")',
      '[class*="trial"]',
      '[class*="premium"]'
    ];

    let buttonClicked = false;
    for (const selector of trialSelectors) {
      try {
        const button = page.locator(selector).first();
        if (await button.isVisible({ timeout: 2000 })) {
          console.log(`7. Found and clicking button: ${selector}`);
          await button.click();
          await page.waitForTimeout(3000);
          buttonClicked = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Screenshot 4: After button click (modal or upgrade flow)
    await page.screenshot({ path: '/tmp/claude/screenshots/04-upgrade-flow.png', fullPage: true });
    console.log('✓ Upgrade flow screenshot saved');

    console.log('8. Testing responsive design...');

    // Mobile test
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/claude/screenshots/05-mobile.png', fullPage: true });
    console.log('✓ Mobile screenshot saved');

    // Tablet test
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/claude/screenshots/06-tablet.png', fullPage: true });
    console.log('✓ Tablet screenshot saved');

    // Back to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/claude/screenshots/07-final.png', fullPage: true });
    console.log('✓ Final screenshot saved');

    console.log('\n=== TEST COMPLETED ===');
    console.log('Button clicked:', buttonClicked ? '✓' : '✗');
    console.log('Screenshots saved: 7');
    console.log('All screenshots are in /tmp/claude/screenshots/');

  } catch (error) {
    console.error('Test error:', error);
    await page.screenshot({ path: '/tmp/claude/screenshots/error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

testPremiumFeatures();
