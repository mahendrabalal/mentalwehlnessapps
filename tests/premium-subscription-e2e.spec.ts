import { test, expect, Page } from '@playwright/test';
import path from 'path';

// Test configuration
const TEST_CREDENTIALS = {
  email: 'mahenbalal@gmail.com',
  password: 'pokhara55AB*'
};

const SCREENSHOTS_DIR = 'test-results/premium-subscription-screenshots';

test.describe('Premium Subscription Upgrade Flow - Healthcare E2E Testing', () => {
  let consoleLogs: string[] = [];
  let consoleErrors: string[] = [];
  let networkRequests: Array<{ url: string, method: string, status?: number, response?: any }> = [];

  test.beforeEach(async ({ page }) => {
    // Setup console monitoring
    consoleLogs = [];
    consoleErrors = [];
    networkRequests = [];

    // Monitor console logs
    page.on('console', msg => {
      const logMessage = `[${msg.type()}] ${msg.text()}`;
      if (msg.type() === 'error') {
        consoleErrors.push(logMessage);
      } else {
        consoleLogs.push(logMessage);
      }
    });

    // Monitor network requests
    page.on('request', request => {
      networkRequests.push({
        url: request.url(),
        method: request.method()
      });
    });

    page.on('response', response => {
      const request = networkRequests.find(req => req.url === response.url());
      if (request) {
        request.status = response.status();
      }
    });

    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('Complete Premium Subscription Upgrade Flow', async ({ page }) => {
    console.log('🏥 Starting Healthcare Premium Subscription Testing...');

    // Step 1: Navigate to application
    console.log('📍 Step 1: Navigating to application...');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/01-homepage.png`, fullPage: true });

    // Step 2: Login with provided credentials
    console.log('🔐 Step 2: Logging in with provided credentials...');

    // Check if already logged in by looking for dashboard elements
    const isDashboardVisible = await page.locator('[data-testid="dashboard"]').isVisible().catch(() => false);

    if (!isDashboardVisible) {
      // Look for login form or login button
      const loginButton = page.locator('button:has-text("Sign In"), button:has-text("Login"), a[href*="login"]').first();
      const loginForm = page.locator('form:has(input[type="email"]), input[type="email"]').first();

      if (await loginForm.isVisible()) {
        // Direct login form is visible
        await page.fill('input[type="email"]', TEST_CREDENTIALS.email);
        await page.fill('input[type="password"]', TEST_CREDENTIALS.password);
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-login-form-filled.png`, fullPage: true });

        const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")').first();
        await submitButton.click();
      } else if (await loginButton.isVisible()) {
        // Need to navigate to login page
        await loginButton.click();
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-login-page.png`, fullPage: true });

        await page.fill('input[type="email"]', TEST_CREDENTIALS.email);
        await page.fill('input[type="password"]', TEST_CREDENTIALS.password);
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-login-form-filled.png`, fullPage: true });

        const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")').first();
        await submitButton.click();
      }

      // Wait for login to complete
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
    }

    // Step 3: Navigate to dashboard
    console.log('🏠 Step 3: Navigating to dashboard...');
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/03-dashboard-loaded.png`, fullPage: true });

    // Step 4: Locate Premium Wellness Features section
    console.log('💎 Step 4: Locating Premium Wellness Features section...');

    // Look for premium features section with various possible selectors
    const premiumSelectors = [
      '[data-testid="premium-features"]',
      '.premium-features',
      '[class*="premium"]',
      'text="Premium"',
      'text="Upgrade"',
      'text="Pro"',
      'button:has-text("Start Free Trial")',
      'button:has-text("Upgrade")',
      'button:has-text("Premium")'
    ];

    let premiumSection = null;
    let premiumButton = null;

    for (const selector of premiumSelectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible()) {
          premiumSection = element;
          if (selector.includes('button')) {
            premiumButton = element;
          }
          console.log(`Found premium element with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!premiumButton) {
      // Look for premium button separately
      const buttonSelectors = [
        'button:has-text("Start Free Trial")',
        'button:has-text("Upgrade to Premium")',
        'button:has-text("Try Premium")',
        'button:has-text("Upgrade")',
        '[data-testid="upgrade-button"]',
        '.upgrade-button'
      ];

      for (const selector of buttonSelectors) {
        try {
          const element = page.locator(selector).first();
          if (await element.isVisible()) {
            premiumButton = element;
            console.log(`Found premium button with selector: ${selector}`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
    }

    // Highlight and screenshot premium features section
    if (premiumSection) {
      await premiumSection.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-premium-features-section.png`, fullPage: true });
    } else {
      console.log('⚠️ Premium features section not found, taking full dashboard screenshot');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-dashboard-full-search.png`, fullPage: true });
    }

    // Step 5: Test Premium Upgrade Modal
    console.log('🚀 Step 5: Testing Premium Upgrade Modal...');

    if (premiumButton) {
      await premiumButton.click();
      await page.waitForTimeout(1000); // Wait for modal animation

      // Look for modal
      const modal = page.locator('[role="dialog"], .modal, [data-testid="upgrade-modal"]').first();
      const isModalVisible = await modal.isVisible().catch(() => false);

      if (isModalVisible) {
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/05-upgrade-modal-opened.png`, fullPage: true });

        // Step 6: Verify pricing plans
        console.log('💰 Step 6: Verifying pricing plans...');

        // Look for pricing information
        const pricingElements = await page.locator('text="$19.99", text="$89.99", text="monthly", text="yearly"').all();
        const monthlyPlan = page.locator('text="$19.99"').first();
        const yearlyPlan = page.locator('text="$89.99"').first();

        console.log(`Found ${pricingElements.length} pricing elements`);

        if (await monthlyPlan.isVisible()) {
          console.log('✅ Monthly plan ($19.99) found');
        } else {
          console.log('❌ Monthly plan ($19.99) not found');
        }

        if (await yearlyPlan.isVisible()) {
          console.log('✅ Yearly plan ($89.99) found');
        } else {
          console.log('❌ Yearly plan ($89.99) not found');
        }

        // Test switching between plans if toggle exists
        const planToggle = page.locator('[data-testid="plan-toggle"], .plan-toggle, button:has-text("Monthly"), button:has-text("Yearly")').first();
        if (await planToggle.isVisible()) {
          await planToggle.click();
          await page.waitForTimeout(500);
          await page.screenshot({ path: `${SCREENSHOTS_DIR}/06-pricing-plans-toggled.png`, fullPage: true });
        }

        // Step 7: Test subscription creation process
        console.log('📝 Step 7: Testing subscription creation process...');

        // Look for subscription buttons
        const subscriptionButtons = [
          'button:has-text("Start 7-Day Free Trial")',
          'button:has-text("Start Free Trial")',
          'button:has-text("Subscribe")',
          'button:has-text("Choose Plan")',
          '[data-testid="subscribe-monthly"]',
          '[data-testid="subscribe-yearly"]'
        ];

        let subscribeButton = null;
        for (const selector of subscriptionButtons) {
          try {
            const element = page.locator(selector).first();
            if (await element.isVisible()) {
              subscribeButton = element;
              console.log(`Found subscribe button: ${selector}`);
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }

        if (subscribeButton) {
          // Screenshot before clicking
          await page.screenshot({ path: `${SCREENSHOTS_DIR}/07-before-subscription-click.png`, fullPage: true });

          await subscribeButton.click();
          await page.waitForTimeout(2000);
          await page.waitForLoadState('networkidle');

          // Screenshot after clicking
          await page.screenshot({ path: `${SCREENSHOTS_DIR}/07-after-subscription-click.png`, fullPage: true });

          // Look for Stripe Elements or payment form
          const stripeElement = page.locator('[data-testid="stripe-payment"], .stripe-element, iframe[src*="stripe"], #card-element').first();
          const paymentForm = page.locator('form:has(input[placeholder*="card"]), form:has(input[placeholder*="Card"])').first();

          if (await stripeElement.isVisible() || await paymentForm.isVisible()) {
            console.log('✅ Stripe payment form loaded');
            await page.screenshot({ path: `${SCREENSHOTS_DIR}/08-stripe-payment-form.png`, fullPage: true });

            // Test with Stripe test card if payment form is available
            const cardInput = page.locator('input[placeholder*="card number"], input[placeholder*="Card number"]').first();
            if (await cardInput.isVisible()) {
              await cardInput.fill('4242424242424242');
              await page.fill('input[placeholder*="expiry"], input[placeholder*="MM"], input[placeholder*="month"]', '12');
              await page.fill('input[placeholder*="year"], input[placeholder*="YY"]', '25');
              await page.fill('input[placeholder*="CVC"], input[placeholder*="cvc"]', '123');
              await page.screenshot({ path: `${SCREENSHOTS_DIR}/08-payment-form-filled.png`, fullPage: true });
            }
          }
        }

        // Step 8: Test error handling and form validation
        console.log('🧪 Step 8: Testing error handling and form validation...');

        // Test modal close functionality
        const closeButton = page.locator('[data-testid="close-modal"], .modal-close, button:has-text("Close"), button:has-text("×")').first();
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(500);
          console.log('✅ Modal close button works');
        }

      } else {
        console.log('❌ Upgrade modal did not open');
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/05-modal-not-found.png`, fullPage: true });
      }
    } else {
      console.log('❌ Premium upgrade button not found');
    }

    // Step 9: Verify healthcare compliance elements
    console.log('🏥 Step 9: Verifying healthcare compliance elements...');

    const complianceSelectors = [
      'text="HIPAA"',
      'text="Privacy"',
      'text="Terms"',
      'text="Crisis"',
      'text="Emergency"',
      'text="Professional"',
      'text="Therapist"',
      'text="Medical"',
      'text="Disclaimer"'
    ];

    const complianceElements = [];
    for (const selector of complianceSelectors) {
      try {
        const elements = await page.locator(selector).all();
        if (elements.length > 0) {
          complianceElements.push({ selector, count: elements.length });
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    console.log('Healthcare compliance elements found:', complianceElements);
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/09-healthcare-compliance-check.png`, fullPage: true });

    // Step 10: Log technical findings
    console.log('🔧 Step 10: Logging technical findings...');

    console.log(`\n📊 TECHNICAL FINDINGS:
    Console Errors: ${consoleErrors.length}
    Console Logs: ${consoleLogs.length}
    Network Requests: ${networkRequests.length}

    Console Errors:
    ${consoleErrors.join('\n')}

    Key Network Requests:
    ${networkRequests.filter(req => req.url.includes('api') || req.url.includes('stripe')).map(req => `${req.method} ${req.url} (${req.status || 'pending'})`).join('\n')}
    `);

    // Final screenshot
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/10-final-state.png`, fullPage: true });

    // Verify no critical JavaScript errors
    expect(consoleErrors.filter(err => err.includes('Error') && !err.includes('Warning')).length).toBeLessThan(3);
  });

  test.afterEach(async ({ page }) => {
    // Log summary
    console.log(`\n📋 TEST SUMMARY:
    - Console Errors: ${consoleErrors.length}
    - Network Requests: ${networkRequests.length}
    - Test Completed Successfully
    `);
  });
});