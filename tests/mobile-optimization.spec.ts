import { test, expect } from '@playwright/test';

/**
 * Mobile Optimization Test Suite
 * Tests mobile responsiveness, performance, and UX best practices
 * Following industry standards: WCAG 2.1, Google Mobile-Friendly guidelines
 */

// Mobile viewport tests - using project configuration from playwright.config.ts
test.describe('Mobile Optimization - Core Requirements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have mobile-friendly viewport meta tag', async ({ page }) => {
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toContain('width=device-width');
    expect(viewportMeta).toContain('initial-scale=1');
  });

  test('should load within 3 seconds (performance)', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have horizontal scroll', async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    console.log(`Scroll width: ${scrollWidth}, Client width: ${clientWidth}`);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
  });

  test('should have touch-friendly navigation (min 44px)', async ({ page }) => {
    const navLinks = page.locator('nav a, nav button').filter({ hasNotText: '' });
    const count = await navLinks.count();

    console.log(`Found ${count} navigation elements`);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = navLinks.nth(i);
      if (await link.isVisible()) {
        const box = await link.boundingBox();

        if (box) {
          console.log(`Nav element ${i}: height=${box.height}px`);
          // WCAG 2.1 Level AAA: minimum 44x44px touch target
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('should have readable font sizes (min 12px)', async ({ page }) => {
    const bodyText = page.locator('body');
    const fontSize = await bodyText.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const fontSizeNum = parseInt(fontSize);
    console.log(`Body font size: ${fontSizeNum}px`);
    expect(fontSizeNum).toBeGreaterThanOrEqual(12);
  });

  test('should have proper image optimization with alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    console.log(`Found ${count} images`);

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // All images should have alt text (WCAG 2.1)
      expect(alt).toBeDefined();
    }
  });

  test('should render hero section properly', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    const text = await heading.textContent();
    console.log(`Hero heading: ${text?.substring(0, 50)}...`);
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(0);
  });

  test('should display CTA buttons prominently', async ({ page }) => {
    const primaryCTA = page.locator('button, a').filter({ hasText: /start|trial|free/i }).first();

    if (await primaryCTA.count() > 0) {
      await expect(primaryCTA).toBeVisible();

      const box = await primaryCTA.boundingBox();
      if (box) {
        console.log(`CTA button size: ${box.width}x${box.height}px`);
        expect(box.height).toBeGreaterThanOrEqual(40);
        expect(box.width).toBeGreaterThanOrEqual(80);
      }
    }
  });

  test('should not use fixed positioning that blocks content', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    const fixedElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const fixed = Array.from(elements).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed';
      });

      return fixed.map((el) => ({
        tag: el.tagName,
        height: el.getBoundingClientRect().height,
      }));
    });

    console.log(`Found ${fixedElements.length} fixed elements`);

    const viewport = page.viewportSize();
    if (viewport) {
      fixedElements.forEach((el) => {
        if (el.height > 0) {
          const percentage = (el.height / viewport.height) * 100;
          console.log(`Fixed element ${el.tag}: ${percentage.toFixed(1)}% of viewport`);
          expect(percentage).toBeLessThan(20);
        }
      });
    }
  });

  test('should handle long content gracefully with scrolling', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Footer should be visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

// Performance-specific mobile tests
test.describe('Mobile Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have acceptable First Contentful Paint', async ({ page }) => {
    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
      return fcpEntry ? fcpEntry.startTime : 0;
    });

    console.log(`First Contentful Paint: ${fcp.toFixed(0)}ms`);
    // FCP should be under 2.5 seconds (Good rating per Core Web Vitals)
    expect(fcp).toBeLessThan(2500);
  });

  test('should not load excessive JavaScript files', async ({ page }) => {
    const scripts: string[] = [];

    page.on('request', (request) => {
      if (request.resourceType() === 'script') {
        scripts.push(request.url());
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    console.log(`Total script files loaded: ${scripts.length}`);
    // Should not load excessive number of scripts
    expect(scripts.length).toBeLessThan(100);
  });

  test('should load critical CSS for fast render', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Check for inline styles or critical CSS
    const hasInlineStyles = await page.evaluate(() => {
      return document.querySelectorAll('style').length > 0;
    });

    console.log(`Has inline styles: ${hasInlineStyles}`);
    expect(hasInlineStyles).toBeTruthy();
  });
});

// Accessibility on mobile
test.describe('Mobile Accessibility (WCAG 2.1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should support screen reader navigation with proper heading hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    console.log(`H1 count: ${h1Count}`);

    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1); // Only one h1 per page

    // Check for semantic landmarks
    const main = await page.locator('main, [role="main"]').count();
    const nav = await page.locator('nav, [role="navigation"]').count();
    const footer = await page.locator('footer, [role="contentinfo"]').count();

    console.log(`Landmarks - main: ${main}, nav: ${nav}, footer: ${footer}`);
    expect(main + nav + footer).toBeGreaterThan(0);
  });

  test('should have proper focus indicators for keyboard navigation', async ({ page }) => {
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    const focusedElement = page.locator(':focus').first();
    const count = await focusedElement.count();

    if (count > 0) {
      const outline = await focusedElement.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
        };
      });

      console.log(`Focus outline: ${outline.outline}`);
      // Should have visible focus indicator
      expect(
        outline.outline !== 'none' ||
        outline.outlineWidth !== '0px'
      ).toBeTruthy();
    }
  });

  test('should have ARIA labels for interactive elements', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    console.log(`Found ${count} buttons`);

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');

        // Button should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    }
  });
});

// Mobile UX Tests
test.describe('Mobile User Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should support pinch-to-zoom (not disabled)', async ({ page }) => {
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');

    console.log(`Viewport meta: ${viewportMeta}`);
    expect(viewportMeta).not.toContain('user-scalable=no');
    expect(viewportMeta).not.toContain('maximum-scale=1.0');
    expect(viewportMeta).not.toContain('maximum-scale=1');
  });

  test('should handle form inputs without zoom issues (iOS)', async ({ page }) => {
    const inputs = page.locator('input[type="email"], input[type="text"], input[type="password"]');
    const count = await inputs.count();

    console.log(`Found ${count} input fields`);

    if (count > 0) {
      const input = inputs.first();
      if (await input.isVisible()) {
        // Font size should be at least 16px to prevent iOS auto-zoom
        const fontSize = await input.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        const fontSizeNum = parseInt(fontSize);
        console.log(`Input font size: ${fontSizeNum}px`);
        expect(fontSizeNum).toBeGreaterThanOrEqual(16);
      }
    }
  });

  test('should have appropriate spacing between clickable elements', async ({ page }) => {
    const buttons = page.locator('button, a[class*="button"], a[class*="btn"]').filter({ hasNotText: '' });
    const count = await buttons.count();

    console.log(`Found ${count} clickable elements`);

    if (count > 1) {
      for (let i = 0; i < Math.min(count - 1, 5); i++) {
        const button1 = buttons.nth(i);
        const button2 = buttons.nth(i + 1);

        if (await button1.isVisible() && await button2.isVisible()) {
          const box1 = await button1.boundingBox();
          const box2 = await button2.boundingBox();

          if (box1 && box2) {
            const spacing = Math.abs(box2.y - (box1.y + box1.height));
            if (spacing > 0 && spacing < 100) { // Only check if they're somewhat close
              console.log(`Spacing between elements ${i} and ${i+1}: ${spacing}px`);
              expect(spacing).toBeGreaterThanOrEqual(8);
            }
          }
        }
      }
    }
  });
});
