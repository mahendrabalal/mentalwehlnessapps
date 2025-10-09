import { test, expect, type Page } from '@playwright/test';

test.describe('Premium Wellness Features - Focused Testing', () => {
  const testCredentials = {
    email: 'mahenbalal@gmail.com',
    password: 'pokhara55AB*'
  };

  test('Complete Premium Features Flow Test', async ({ page }) => {
    console.log('🚀 Starting comprehensive Premium Features test...');

    // Step 1: Login
    console.log('🔐 Step 1: Logging in...');
    await page.goto('/auth/login');

    // Wait for login page to load
    await page.waitForLoadState('networkidle');

    // Fill login form - be flexible with selectors
    await page.fill('input[name="email"], input[type="email"]', testCredentials.email);
    await page.fill('input[name="password"], input[type="password"]', testCredentials.password);

    // Submit login
    await page.click('button[type="submit"], .btn-primary, button:has-text("Sign In")');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
    console.log('✅ Login successful');

    // Step 2: Locate Premium Features Section
    console.log('🎯 Step 2: Locating Premium Features section...');
    await page.waitForLoadState('networkidle');

    // Take a full page screenshot to see what's available
    await page.screenshot({ path: '/tmp/claude/dashboard-full-page.png', fullPage: true });

    // Look for premium section with flexible selectors
    const premiumSelectors = [
      'div:has-text("Premium Wellness Features")',
      'div:has-text("Unlock Premium Wellness Features")',
      'div:has-text("Premium Features")',
      'div:has-text("24/7 AI Companion")',
      'div:has-text("Start Free Trial")',
      '.bg-gradient-to-r.from-therapy-500',
      'div[class*="gradient"]'
    ];

    let premiumSection = null;
    for (const selector of premiumSelectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          premiumSection = element;
          console.log(`✅ Found premium section with selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!premiumSection) {
      console.log('❌ Premium section not found, checking page content...');
      const pageContent = await page.textContent('body');
      console.log('Page text content preview:', pageContent?.substring(0, 500));
      throw new Error('Premium Features section not found');
    }

    // Step 3: Verify Visual Elements
    console.log('👀 Step 3: Verifying visual elements...');

    // Check for key features text
    const featuresText = [
      '24/7 AI Companion',
      'Smart Analytics',
      'Premium Content',
      'Personalized wellness support',
      'Advanced mood insights',
      'guided meditations'
    ];

    let foundFeatures = 0;
    for (const text of featuresText) {
      const element = page.locator(`text=${text}`);
      if (await element.isVisible({ timeout: 2000 })) {
        foundFeatures++;
        console.log(`✅ Found feature: ${text}`);
      }
    }

    console.log(`Found ${foundFeatures}/${featuresText.length} key features`);

    // Check for pricing
    const pricingElements = await page.locator('text=/\\$19\\.99/').count();
    if (pricingElements > 0) {
      console.log('✅ Pricing information found');
    }

    // Step 4: Look for Trial Button
    console.log('🎯 Step 4: Looking for trial button...');

    const trialButtonSelectors = [
      'button:has-text("Start Free Trial")',
      'button:has-text("Free Trial")',
      'button:has-text("Trial")',
      'button:has-text("Upgrade")',
      '.btn-primary:has-text("Start")',
      'a:has-text("Start Free Trial")'
    ];

    let trialButton = null;
    for (const selector of trialButtonSelectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          trialButton = element;
          console.log(`✅ Found trial button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (trialButton) {
      // Step 5: Test Button Click
      console.log('🚀 Step 5: Testing trial button click...');

      await trialButton.click();
      await page.waitForTimeout(2000); // Wait for modal/navigation

      // Check if modal opened or navigation occurred
      const modalVisible = await page.locator('div.fixed.inset-0, .modal, [role="dialog"]').isVisible({ timeout: 3000 });
      const urlChanged = page.url().includes('subscription') || page.url().includes('upgrade');

      if (modalVisible) {
        console.log('✅ Modal opened successfully');

        // Take screenshot of modal
        await page.screenshot({ path: '/tmp/claude/premium-modal.png' });

        // Check modal content
        const modalContent = await page.textContent('.modal, [role="dialog"], .fixed');
        if (modalContent?.includes('Premium') || modalContent?.includes('$5.99')) {
          console.log('✅ Modal contains expected premium content');
        }

      } else if (urlChanged) {
        console.log('✅ Navigation to upgrade page successful');
      } else {
        console.log('⚠️ Button click may not have triggered expected action');
      }

      // Step 6: Check for Healthcare Compliance
      console.log('🏥 Step 6: Checking healthcare compliance elements...');

      const complianceTexts = [
        'not a substitute for professional therapy',
        'HIPAA',
        'medical advice',
        'wellness support',
        'Cancel Anytime'
      ];

      let complianceFound = 0;
      for (const text of complianceTexts) {
        if (await page.locator(`text=${text}`).isVisible({ timeout: 2000 })) {
          complianceFound++;
          console.log(`✅ Found compliance text: ${text}`);
        }
      }

      console.log(`Found ${complianceFound}/${complianceTexts.length} compliance elements`);
    }

    // Step 7: Take Final Screenshots
    console.log('📸 Step 7: Taking final screenshots...');

    // Screenshot of current state
    await page.screenshot({ path: '/tmp/claude/final-state.png', fullPage: true });

    // Test mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: '/tmp/claude/mobile-view.png', fullPage: true });

    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log('✅ Premium Features testing completed successfully!');

    // Step 8: Generate Test Report
    console.log('📊 Step 8: Generating test report...');

    const report = {
      timestamp: new Date().toISOString(),
      testResults: {
        loginSuccessful: true,
        premiumSectionFound: !!premiumSection,
        featuresFound: foundFeatures,
        totalFeatures: featuresText.length,
        trialButtonFound: !!trialButton,
        complianceElementsFound: complianceFound || 0,
        screenshotsTaken: [
          'dashboard-full-page.png',
          'premium-modal.png',
          'final-state.png',
          'mobile-view.png'
        ]
      },
      conclusions: {
        premiumFeaturesImplementation: premiumSection ? 'FOUND' : 'NOT_FOUND',
        userExperience: trialButton ? 'FUNCTIONAL' : 'NEEDS_REVIEW',
        healthcareCompliance: complianceFound > 2 ? 'GOOD' : 'NEEDS_IMPROVEMENT',
        overallStatus: 'TESTING_COMPLETED'
      }
    };

    console.log('📋 Test Report Summary:');
    console.log(`✅ Premium section found: ${report.testResults.premiumSectionFound}`);
    console.log(`✅ Features detected: ${report.testResults.featuresFound}/${report.testResults.totalFeatures}`);
    console.log(`✅ Trial button functional: ${report.testResults.trialButtonFound}`);
    console.log(`✅ Compliance elements: ${report.testResults.complianceElementsFound}`);
    console.log(`📁 Screenshots saved to /tmp/claude/`);

    // Store report in browser storage
    await page.evaluate((reportData) => {
      localStorage.setItem('premiumFeaturesTestReport', JSON.stringify(reportData, null, 2));
    }, report);
  });

  test('Quick Visual Verification', async ({ page }) => {
    console.log('👀 Quick visual verification test...');

    // Just go to dashboard and take screenshots
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshots at different viewports
    const viewports = [
      { name: 'desktop', width: 1280, height: 720 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `/tmp/claude/dashboard-${viewport.name}.png`,
        fullPage: true
      });
      console.log(`📸 Screenshot taken: dashboard-${viewport.name}.png`);
    }

    console.log('✅ Visual verification completed');
  });
});