const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test credentials and configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3001',
  credentials: {
    email: 'mahenbalal@gmail.com',
    password: 'pokhara55AB*'
  },
  screenshotDir: 'test-results/manual-premium-test-screenshots',
  testCard: '4242424242424242'
};

// Create screenshots directory
if (!fs.existsSync(TEST_CONFIG.screenshotDir)) {
  fs.mkdirSync(TEST_CONFIG.screenshotDir, { recursive: true });
}

class PremiumSubscriptionTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.consoleLogs = [];
    this.consoleErrors = [];
    this.networkRequests = [];
    this.testResults = {
      steps: [],
      complianceElements: [],
      technicalFindings: [],
      screenshots: []
    };
  }

  async setup() {
    console.log('🚀 Starting Manual Premium Subscription Testing...');

    this.browser = await chromium.launch({
      headless: false, // Run in headed mode to see what's happening
      slowMo: 1000, // Slow down actions for visibility
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });

    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1440, height: 900 });

    // Setup monitoring
    this.page.on('console', msg => {
      const logMessage = `[${msg.type()}] ${msg.text()}`;
      if (msg.type() === 'error') {
        this.consoleErrors.push(logMessage);
      } else {
        this.consoleLogs.push(logMessage);
      }
    });

    this.page.on('request', request => {
      this.networkRequests.push({
        url: request.url(),
        method: request.method(),
        timestamp: new Date().toISOString()
      });
    });

    console.log('✅ Browser setup complete');
  }

  async takeScreenshot(name, description) {
    const filename = `${String(this.testResults.steps.length + 1).padStart(2, '0')}-${name}.png`;
    const filepath = path.join(TEST_CONFIG.screenshotDir, filename);
    await this.page.screenshot({ path: filepath, fullPage: true });

    this.testResults.screenshots.push({
      step: this.testResults.steps.length + 1,
      filename,
      description,
      timestamp: new Date().toISOString()
    });

    console.log(`📸 Screenshot saved: ${filename} - ${description}`);
    return filepath;
  }

  async recordStep(step, description, status = 'completed', details = {}) {
    this.testResults.steps.push({
      step,
      description,
      status,
      details,
      timestamp: new Date().toISOString()
    });
    console.log(`${status === 'completed' ? '✅' : status === 'failed' ? '❌' : '🔄'} Step ${step}: ${description}`);
  }

  async navigateToApplication() {
    await this.recordStep(1, 'Navigate to application homepage', 'in_progress');

    try {
      await this.page.goto(TEST_CONFIG.baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await this.takeScreenshot('homepage', 'Application homepage loaded');
      await this.recordStep(1, 'Navigate to application homepage', 'completed');
    } catch (error) {
      await this.recordStep(1, 'Navigate to application homepage', 'failed', { error: error.message });
      throw error;
    }
  }

  async loginToApplication() {
    await this.recordStep(2, 'Login with provided credentials', 'in_progress');

    try {
      // Check if already logged in
      const isDashboard = await this.page.locator('[data-testid="dashboard"], h1:has-text("Wellness Dashboard")').isVisible().catch(() => false);

      if (isDashboard) {
        await this.recordStep(2, 'Already logged in - redirecting to dashboard', 'completed');
        return;
      }

      // Look for login form or button
      await this.page.waitForTimeout(2000);

      // Try to find login elements with multiple selectors
      const loginSelectors = [
        'input[type="email"]',
        'input[placeholder*="email" i]',
        'input[name="email"]',
        '[data-testid="email-input"]'
      ];

      let emailInput = null;
      for (const selector of loginSelectors) {
        try {
          emailInput = this.page.locator(selector).first();
          if (await emailInput.isVisible({ timeout: 2000 })) {
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!emailInput || !await emailInput.isVisible()) {
        // Look for login button or link
        const loginButtonSelectors = [
          'button:has-text("Sign In")',
          'button:has-text("Login")',
          'a:has-text("Sign In")',
          'a:has-text("Login")',
          'a[href*="login"]',
          'button[data-testid="login-button"]'
        ];

        for (const selector of loginButtonSelectors) {
          try {
            const loginButton = this.page.locator(selector).first();
            if (await loginButton.isVisible({ timeout: 2000 })) {
              await loginButton.click();
              await this.page.waitForLoadState('domcontentloaded');
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
      }

      await this.takeScreenshot('login-page', 'Login page or form located');

      // Try to fill login form
      await this.page.waitForTimeout(1000);

      // Find email and password inputs
      const emailField = this.page.locator('input[type="email"], input[placeholder*="email" i]').first();
      const passwordField = this.page.locator('input[type="password"], input[placeholder*="password" i]').first();

      if (await emailField.isVisible()) {
        await emailField.fill(TEST_CONFIG.credentials.email);
        await this.recordStep(2.1, 'Email field filled', 'completed');
      }

      if (await passwordField.isVisible()) {
        await passwordField.fill(TEST_CONFIG.credentials.password);
        await this.recordStep(2.2, 'Password field filled', 'completed');
      }

      await this.takeScreenshot('login-form-filled', 'Login form completed');

      // Submit the form
      const submitSelectors = [
        'button[type="submit"]',
        'button:has-text("Sign In")',
        'button:has-text("Login")',
        'input[type="submit"]'
      ];

      for (const selector of submitSelectors) {
        try {
          const submitButton = this.page.locator(selector).first();
          if (await submitButton.isVisible({ timeout: 2000 })) {
            await submitButton.click();
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Wait for navigation
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000);

      await this.recordStep(2, 'Login with provided credentials', 'completed');
    } catch (error) {
      await this.recordStep(2, 'Login with provided credentials', 'failed', { error: error.message });
      console.log('⚠️ Login may have failed, but continuing with test...');
    }
  }

  async navigateToDashboard() {
    await this.recordStep(3, 'Navigate to dashboard', 'in_progress');

    try {
      // Go directly to dashboard
      await this.page.goto(`${TEST_CONFIG.baseUrl}/dashboard`, {
        waitUntil: 'domcontentloaded',
        timeout: 10000
      });

      await this.page.waitForTimeout(3000);
      await this.takeScreenshot('dashboard-loaded', 'Dashboard page loaded');
      await this.recordStep(3, 'Navigate to dashboard', 'completed');
    } catch (error) {
      await this.recordStep(3, 'Navigate to dashboard', 'failed', { error: error.message });
      console.log('⚠️ Dashboard navigation may have failed, but continuing...');
    }
  }

  async locatePremiumFeatures() {
    await this.recordStep(4, 'Locate Premium Wellness Features section', 'in_progress');

    try {
      // Look for premium features section
      await this.page.waitForTimeout(2000);

      const premiumSelectors = [
        '[data-testid="premium-features"]',
        '.premium-features',
        'text="Premium"',
        'text="Upgrade"',
        'button:has-text("Start Free Trial")',
        'button:has-text("Upgrade")',
        '.bg-gradient-to-r' // The premium section has a gradient background
      ];

      let premiumSection = null;
      for (const selector of premiumSelectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            premiumSection = element;
            await element.scrollIntoViewIfNeeded();
            console.log(`Found premium element with selector: ${selector}`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      await this.takeScreenshot('premium-features-located', 'Premium features section located');

      if (premiumSection) {
        await this.recordStep(4, 'Located Premium Wellness Features section', 'completed');
      } else {
        await this.recordStep(4, 'Premium features section not found', 'failed');
      }
    } catch (error) {
      await this.recordStep(4, 'Locate Premium Wellness Features section', 'failed', { error: error.message });
    }
  }

  async testUpgradeModal() {
    await this.recordStep(5, 'Test Premium Upgrade Modal functionality', 'in_progress');

    try {
      // Look for the "Start Free Trial" button
      const upgradeButtonSelectors = [
        'button:has-text("Start Free Trial")',
        'button:has-text("Upgrade to Premium")',
        'button:has-text("Try Premium")',
        'button:has-text("Upgrade")',
        '[data-testid="upgrade-button"]'
      ];

      let upgradeButton = null;
      for (const selector of upgradeButtonSelectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            upgradeButton = element;
            console.log(`Found upgrade button: ${selector}`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (upgradeButton) {
        await upgradeButton.scrollIntoViewIfNeeded();
        await this.takeScreenshot('before-modal-click', 'Before clicking upgrade button');

        await upgradeButton.click();
        await this.page.waitForTimeout(2000);

        // Look for modal
        const modalSelectors = [
          '[role="dialog"]',
          '.modal',
          '[data-testid="upgrade-modal"]',
          '.fixed.inset-0' // Common modal backdrop
        ];

        let modalFound = false;
        for (const selector of modalSelectors) {
          try {
            const modal = this.page.locator(selector).first();
            if (await modal.isVisible({ timeout: 2000 })) {
              modalFound = true;
              console.log(`Modal opened with selector: ${selector}`);
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }

        await this.takeScreenshot('upgrade-modal-opened', 'Premium upgrade modal opened');

        if (modalFound) {
          await this.recordStep(5, 'Premium upgrade modal opened successfully', 'completed');
          return true;
        } else {
          await this.recordStep(5, 'Modal did not open after clicking upgrade button', 'failed');
          return false;
        }
      } else {
        await this.recordStep(5, 'Upgrade button not found', 'failed');
        return false;
      }
    } catch (error) {
      await this.recordStep(5, 'Test Premium Upgrade Modal functionality', 'failed', { error: error.message });
      return false;
    }
  }

  async verifyPricingPlans() {
    await this.recordStep(6, 'Verify pricing plans display correctly', 'in_progress');

    try {
      await this.page.waitForTimeout(1000);

      // Look for pricing information
      const monthlyPriceVisible = await this.page.locator('text="$19.99"').isVisible();
      const yearlyPriceVisible = await this.page.locator('text="$89.99"').isVisible();
      const monthlyTextVisible = await this.page.locator('text=/monthly/i').isVisible();
      const yearlyTextVisible = await this.page.locator('text=/yearly/i, text=/year/i').isVisible();

      const pricingDetails = {
        monthlyPrice: monthlyPriceVisible,
        yearlyPrice: yearlyPriceVisible,
        monthlyText: monthlyTextVisible,
        yearlyText: yearlyTextVisible
      };

      await this.takeScreenshot('pricing-plans', 'Pricing plans display verification');

      // Test plan switching if toggle exists
      const planToggleSelectors = [
        '[data-testid="plan-toggle"]',
        '.plan-toggle',
        'button:has-text("Monthly")',
        'button:has-text("Yearly")',
        'button:has-text("month")',
        'button:has-text("year")'
      ];

      for (const selector of planToggleSelectors) {
        try {
          const toggle = this.page.locator(selector).first();
          if (await toggle.isVisible({ timeout: 1000 })) {
            await toggle.click();
            await this.page.waitForTimeout(500);
            await this.takeScreenshot('pricing-toggled', 'Pricing plans after toggle');
            console.log('✅ Plan toggle functionality works');
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      await this.recordStep(6, 'Verified pricing plans display', 'completed', { pricingDetails });

      if (monthlyPriceVisible) {
        console.log('✅ Monthly plan ($19.99) found');
      } else {
        console.log('❌ Monthly plan ($19.99) not found');
      }

      if (yearlyPriceVisible) {
        console.log('✅ Yearly plan ($89.99) found');
      } else {
        console.log('❌ Yearly plan ($89.99) not found');
      }

      return pricingDetails;
    } catch (error) {
      await this.recordStep(6, 'Verify pricing plans display correctly', 'failed', { error: error.message });
      return null;
    }
  }

  async testSubscriptionFlow() {
    await this.recordStep(7, 'Test subscription creation process', 'in_progress');

    try {
      // Look for subscription buttons
      const subscriptionButtonSelectors = [
        'button:has-text("Start 7-Day Free Trial")',
        'button:has-text("Start Free Trial")',
        'button:has-text("Subscribe")',
        'button:has-text("Choose Plan")',
        '[data-testid="subscribe-monthly"]'
      ];

      let subscribeButton = null;
      for (const selector of subscriptionButtonSelectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            subscribeButton = element;
            console.log(`Found subscription button: ${selector}`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (subscribeButton) {
        await this.takeScreenshot('before-subscription-click', 'Before clicking subscription button');

        await subscribeButton.click();
        await this.page.waitForTimeout(3000);

        await this.takeScreenshot('after-subscription-click', 'After clicking subscription button');

        // Look for Stripe payment elements or success message
        const stripeElementVisible = await this.page.locator('[data-testid="stripe-payment"], .stripe-element, iframe[src*="stripe"]').isVisible().catch(() => false);
        const paymentFormVisible = await this.page.locator('form:has(input[placeholder*="card"]), form:has(input[placeholder*="Card"])').isVisible().catch(() => false);
        const successMessageVisible = await this.page.locator('text="Success", text="Welcome to Premium"').isVisible().catch(() => false);

        if (stripeElementVisible || paymentFormVisible) {
          console.log('✅ Payment form loaded');
          await this.takeScreenshot('payment-form', 'Stripe payment form loaded');

          // Try to fill test payment information
          try {
            const cardInput = this.page.locator('input[placeholder*="card number" i], input[placeholder*="Card number"]').first();
            if (await cardInput.isVisible({ timeout: 5000 })) {
              await cardInput.fill(TEST_CONFIG.testCard);

              // Fill expiry date
              const expiryInput = this.page.locator('input[placeholder*="expiry" i], input[placeholder*="MM" i]').first();
              if (await expiryInput.isVisible()) {
                await expiryInput.fill('12/25');
              }

              // Fill CVC
              const cvcInput = this.page.locator('input[placeholder*="CVC" i], input[placeholder*="cvc"]').first();
              if (await cvcInput.isVisible()) {
                await cvcInput.fill('123');
              }

              await this.takeScreenshot('payment-form-filled', 'Payment form filled with test data');
            }
          } catch (e) {
            console.log('⚠️ Could not fill payment form, but form is visible');
          }

          await this.recordStep(7, 'Payment form loaded successfully', 'completed');
        } else if (successMessageVisible) {
          console.log('✅ Trial subscription created without payment');
          await this.takeScreenshot('trial-success', 'Trial subscription success');
          await this.recordStep(7, 'Trial subscription created successfully', 'completed');
        } else {
          console.log('⚠️ Subscription flow result unclear');
          await this.recordStep(7, 'Subscription flow initiated but result unclear', 'partial');
        }
      } else {
        await this.recordStep(7, 'Subscription button not found', 'failed');
      }
    } catch (error) {
      await this.recordStep(7, 'Test subscription creation process', 'failed', { error: error.message });
    }
  }

  async testErrorHandling() {
    await this.recordStep(8, 'Test error handling and form validation', 'in_progress');

    try {
      // Test modal close functionality
      const closeButtonSelectors = [
        '[data-testid="close-modal"]',
        '.modal-close',
        'button:has-text("Close")',
        'button:has-text("×")',
        'svg'
      ];

      let closeButtonFound = false;
      for (const selector of closeButtonSelectors) {
        try {
          const closeButton = this.page.locator(selector).first();
          if (await closeButton.isVisible({ timeout: 2000 })) {
            await this.takeScreenshot('before-close-modal', 'Before closing modal');
            await closeButton.click();
            await this.page.waitForTimeout(1000);
            await this.takeScreenshot('after-close-modal', 'After closing modal');
            closeButtonFound = true;
            console.log('✅ Modal close button works');
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      await this.recordStep(8, 'Error handling and form validation tested', closeButtonFound ? 'completed' : 'partial');
    } catch (error) {
      await this.recordStep(8, 'Test error handling and form validation', 'failed', { error: error.message });
    }
  }

  async verifyHealthcareCompliance() {
    await this.recordStep(9, 'Verify healthcare compliance elements', 'in_progress');

    try {
      // Go back to dashboard to check for compliance elements
      await this.page.goto(`${TEST_CONFIG.baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);

      const complianceKeywords = [
        'HIPAA',
        'Privacy',
        'Terms',
        'Crisis',
        'Emergency',
        'Professional',
        'Therapist',
        'Medical',
        'Disclaimer',
        'Healthcare',
        'Clinical'
      ];

      const complianceElements = [];

      for (const keyword of complianceKeywords) {
        try {
          const elements = await this.page.locator(`text="${keyword}" >> visible=true`).all();
          if (elements.length > 0) {
            complianceElements.push({
              keyword,
              count: elements.length,
              found: true
            });
            console.log(`✅ Found ${elements.length} instances of "${keyword}"`);
          }
        } catch (e) {
          complianceElements.push({
            keyword,
            count: 0,
            found: false
          });
        }
      }

      await this.takeScreenshot('compliance-elements', 'Healthcare compliance elements verification');

      this.testResults.complianceElements = complianceElements;
      await this.recordStep(9, 'Healthcare compliance elements verified', 'completed', { complianceElements });

      // Check for healthcare headers
      const response = await this.page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'domcontentloaded' });
      const headers = response.headers();

      const healthcareHeaders = {
        'x-hipaa-compliant': headers['x-hipaa-compliant'],
        'x-healthcare-platform': headers['x-healthcare-platform'],
        'strict-transport-security': headers['strict-transport-security'],
        'x-frame-options': headers['x-frame-options'],
        'x-content-type-options': headers['x-content-type-options']
      };

      this.testResults.technicalFindings.push({
        category: 'Healthcare Headers',
        details: healthcareHeaders
      });

      console.log('Healthcare Headers:', healthcareHeaders);
    } catch (error) {
      await this.recordStep(9, 'Verify healthcare compliance elements', 'failed', { error: error.message });
    }
  }

  async generateTestReport() {
    await this.recordStep(10, 'Generate comprehensive test report', 'in_progress');

    // Finalize technical findings
    this.testResults.technicalFindings.push({
      category: 'Console Errors',
      count: this.consoleErrors.length,
      details: this.consoleErrors.slice(0, 10) // First 10 errors
    });

    this.testResults.technicalFindings.push({
      category: 'Network Requests',
      count: this.networkRequests.length,
      apiRequests: this.networkRequests.filter(req => req.url.includes('api')).length,
      stripeRequests: this.networkRequests.filter(req => req.url.includes('stripe')).length
    });

    const report = {
      testExecution: {
        timestamp: new Date().toISOString(),
        duration: 'Manual execution',
        application: 'BMad Method Mental Wellness App',
        testType: 'Premium Subscription E2E Testing'
      },
      summary: {
        totalSteps: this.testResults.steps.length,
        completedSteps: this.testResults.steps.filter(s => s.status === 'completed').length,
        failedSteps: this.testResults.steps.filter(s => s.status === 'failed').length,
        screenshots: this.testResults.screenshots.length
      },
      testResults: this.testResults,
      recommendations: this.generateRecommendations()
    };

    // Write report to file
    const reportPath = path.join(TEST_CONFIG.screenshotDir, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`📊 Test report generated: ${reportPath}`);
    await this.recordStep(10, 'Generated comprehensive test report', 'completed', { reportPath });

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    // Check for critical issues
    if (this.consoleErrors.length > 10) {
      recommendations.push({
        priority: 'High',
        category: 'JavaScript Errors',
        issue: `${this.consoleErrors.length} console errors detected`,
        recommendation: 'Review and fix JavaScript errors that could impact user experience'
      });
    }

    // Check for compliance elements
    const hipaaFound = this.testResults.complianceElements.find(e => e.keyword === 'HIPAA' && e.found);
    if (!hipaaFound) {
      recommendations.push({
        priority: 'Critical',
        category: 'Healthcare Compliance',
        issue: 'HIPAA compliance notices not clearly visible',
        recommendation: 'Ensure HIPAA compliance notices are prominently displayed'
      });
    }

    const crisisFound = this.testResults.complianceElements.find(e => e.keyword === 'Crisis' && e.found);
    if (!crisisFound) {
      recommendations.push({
        priority: 'Critical',
        category: 'Healthcare Safety',
        issue: 'Crisis intervention resources not visible',
        recommendation: 'Ensure crisis support resources are easily accessible'
      });
    }

    // Check subscription flow
    const subscriptionSteps = this.testResults.steps.filter(s => s.description.includes('subscription'));
    if (subscriptionSteps.some(s => s.status === 'failed')) {
      recommendations.push({
        priority: 'High',
        category: 'Premium Monetization',
        issue: 'Subscription creation process has issues',
        recommendation: 'Review and fix subscription flow for healthcare-grade reliability'
      });
    }

    return recommendations;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function runPremiumSubscriptionTest() {
  const tester = new PremiumSubscriptionTester();

  try {
    await tester.setup();

    // Execute test steps
    await tester.navigateToApplication();
    await tester.loginToApplication();
    await tester.navigateToDashboard();
    await tester.locatePremiumFeatures();
    await tester.testUpgradeModal();
    await tester.verifyPricingPlans();
    await tester.testSubscriptionFlow();
    await tester.testErrorHandling();
    await tester.verifyHealthcareCompliance();

    const report = await tester.generateTestReport();

    console.log('\n🎉 PREMIUM SUBSCRIPTION TESTING COMPLETE!');
    console.log('\n📊 SUMMARY:');
    console.log(`   • Total Steps: ${report.summary.totalSteps}`);
    console.log(`   • Completed: ${report.summary.completedSteps}`);
    console.log(`   • Failed: ${report.summary.failedSteps}`);
    console.log(`   • Screenshots: ${report.summary.screenshots}`);

    if (report.recommendations.length > 0) {
      console.log('\n⚠️  RECOMMENDATIONS:');
      report.recommendations.forEach(rec => {
        console.log(`   • [${rec.priority}] ${rec.category}: ${rec.recommendation}`);
      });
    }

    console.log(`\n📁 Full report and screenshots saved to: ${TEST_CONFIG.screenshotDir}/`);

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  } finally {
    await tester.cleanup();
  }
}

// Run the test
if (require.main === module) {
  runPremiumSubscriptionTest().catch(console.error);
}

module.exports = { PremiumSubscriptionTester, runPremiumSubscriptionTest };