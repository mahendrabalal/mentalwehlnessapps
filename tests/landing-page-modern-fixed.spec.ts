import { test, expect } from '@playwright/test';

test.describe('Modern Landing Page - Fixed', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero section with key elements', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Intelligence');

    // Check call-to-action buttons
    await expect(page.getByRole('button', { name: 'Start Your Free Trial' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'See How It Works' })).toBeVisible();

    // Check subtitle
    const subtitle = page.locator('text=AI-powered insights, clinical-grade assessments');
    await expect(subtitle).toBeVisible();
  });

  test('should display app interface preview', async ({ page }) => {
    // Check mock dashboard elements
    await expect(page.locator('text=MindWell AI Dashboard')).toBeVisible();
    await expect(page.locator('text=Good morning! 🌅')).toBeVisible();
    await expect(page.locator('text=Premium Active')).toBeVisible();
  });

  test('should display social proof statistics', async ({ page }) => {
    // Look for specific percentages in the social proof section
    const socialSection = page.locator('section').nth(1);
    await expect(socialSection.locator('text=94%')).toBeVisible();
    await expect(socialSection.locator('text=89%')).toBeVisible();
  });

  test('should navigate to features section', async ({ page }) => {
    // Scroll to features and check key elements
    await page.locator('#features').scrollIntoViewIfNeeded();

    // Check AI Companion feature card
    const aiCard = page.locator('text=24/7 AI Therapy Companion').locator('..');
    await expect(aiCard).toBeVisible();

    // Check Smart Analytics feature card
    await expect(page.getByRole('heading', { name: 'Smart Analytics' })).toBeVisible();

    // Check Daily Intelligence feature card
    const dailyCard = page.locator('text=Daily Intelligence').locator('..');
    await expect(dailyCard).toBeVisible();
  });

  test('should display pricing cards', async ({ page }) => {
    // Navigate to pricing section
    await page.locator('#pricing').scrollIntoViewIfNeeded();

    // Check Free plan heading specifically
    await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible();

    // Check Premium plan heading specifically
    await expect(page.getByRole('heading', { name: 'Premium' })).toBeVisible();

    // Check pricing
    await expect(page.locator('text=$0')).toBeVisible();
    await expect(page.locator('text=$19.99')).toBeVisible();

    // Check "Most Popular" badge
    await expect(page.locator('text=Most Popular')).toBeVisible();
  });

  test('should display trust and safety content', async ({ page }) => {
    // Navigate to trust section
    await page.locator('#about').scrollIntoViewIfNeeded();

    // Check trust pillars by heading
    await expect(page.getByRole('heading', { name: 'HIPAA Compliant' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Evidence-Based' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Crisis Prevention' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Professional Support' })).toBeVisible();

    // Check crisis resources
    await expect(page.locator('text=Call 911')).toBeVisible();
    await expect(page.locator('text=Call or Text 988')).toBeVisible();
    await expect(page.locator('text=Text HOME to 741741')).toBeVisible();
  });

  test('should display footer with brand and navigation', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check brand in footer specifically
    const footerBrand = page.locator('footer').getByText('MindWell AI').first();
    await expect(footerBrand).toBeVisible();

    // Check navigation sections in footer specifically
    const footer = page.locator('footer');
    await expect(footer.getByRole('heading', { name: 'Product' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Support', exact: true })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Legal' })).toBeVisible();

    // Check copyright
    await expect(page.locator('text=© 2024 MindWell AI')).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    // Test features navigation
    await page.click('a[href="#features"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#features')).toBeInViewport();

    // Test pricing navigation
    await page.click('a[href="#pricing"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#pricing')).toBeInViewport();

    // Test about navigation
    await page.click('a[href="#about"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should handle CTA button clicks without errors', async ({ page }) => {
    // Monitor console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Click main CTA button
    await page.getByRole('button', { name: 'Start Your Free Trial' }).click();
    await page.waitForTimeout(1000);

    // Verify no critical console errors
    const criticalErrors = errors.filter(error =>
      !error.includes('Warning') &&
      !error.includes('favicon') &&
      !error.includes('DevTools')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check key mobile elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Your Free Trial' })).toBeVisible();

    // Check that content is still accessible on mobile
    await page.locator('#features').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: '24/7 AI Therapy Companion' })).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    // Check that we have the main sections
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main, section').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check that we have proper heading structure
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThanOrEqual(1);

    // Check that sections have IDs for navigation
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.locator('#pricing')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
  });

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds (generous for CI)
    expect(loadTime).toBeLessThan(10000);

    // Check that loading state is not visible
    await expect(page.locator('text=Loading...')).not.toBeVisible();
  });
});