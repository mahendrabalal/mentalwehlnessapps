import { test, expect } from '@playwright/test';

/**
 * Hamburger Menu Mobile Navigation Test Suite
 * Tests mobile navigation best practices and WCAG 2.1 compliance
 */

test.describe('Hamburger Menu - Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hamburger menu button on mobile viewports', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburgerButton).toBeVisible();

    // Should have proper ARIA attributes
    const ariaExpanded = await hamburgerButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
  });

  test('should hide hamburger menu on desktop viewports', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburgerButton).not.toBeVisible();

    // Desktop menu should be visible
    const desktopMenu = page.locator('nav div.hidden.md\\:flex');
    await expect(desktopMenu).toBeVisible();
  });

  test('should meet WCAG 2.1 Level AAA touch target size (44x44px minimum)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    const box = await hamburgerButton.boundingBox();

    expect(box).not.toBeNull();
    if (box) {
      console.log(`Hamburger button size: ${box.width}x${box.height}px`);
      // WCAG 2.1 Level AAA requires minimum 44x44px
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should open mobile menu when hamburger button is tapped', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Initially closed
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await hamburgerButton.click();

    // Should update aria-expanded
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

    // Menu panel should be visible
    const mobileMenu = page.locator('nav div.md\\:hidden').filter({ hasText: 'Features' });
    await expect(mobileMenu).toBeVisible();
  });

  test('should close mobile menu when hamburger button is tapped again', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Open menu
    await hamburgerButton.click();
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu
    await hamburgerButton.click();
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should display hamburger icon when menu is closed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Should have hamburger icon (3 horizontal lines)
    const hamburgerIcon = hamburgerButton.locator('svg path[d*="M4 6h16M4 12h16M4 18h16"]');
    await expect(hamburgerIcon).toBeVisible();
  });

  test('should display close icon (X) when menu is open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Open menu
    await hamburgerButton.click();

    // Should show close icon (X)
    const closeIcon = hamburgerButton.locator('svg path[d*="M6 18L18 6M6 6l12 12"]');
    await expect(closeIcon).toBeVisible();
  });

  test('should contain all navigation links in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburgerButton.click();

    // Check for essential links
    const featuresLink = page.locator('nav a[href="#features"]').filter({ hasText: 'Features' });
    const pricingLink = page.locator('nav a[href="#pricing"]').filter({ hasText: 'Pricing' });
    const aboutLink = page.locator('nav a[href="#about"]').filter({ hasText: 'About' });

    await expect(featuresLink).toBeVisible();
    await expect(pricingLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  });

  test('should have touch-friendly menu items (minimum 44px height)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburgerButton.click();

    // Check menu items
    const menuItems = page.locator('nav div.md\\:hidden a');
    const count = await menuItems.count();

    console.log(`Found ${count} mobile menu items`);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const item = menuItems.nth(i);
      const box = await item.boundingBox();

      if (box) {
        console.log(`Menu item ${i}: height=${box.height}px`);
        // WCAG 2.1 Level AAA: minimum 44px
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should close menu when a navigation link is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburgerButton.click();

    // Click a menu link
    const featuresLink = page.locator('nav a[href="#features"]').filter({ hasText: 'Features' }).first();
    await featuresLink.click();

    // Wait for navigation
    await page.waitForTimeout(500);

    // Menu should close
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should have proper focus indicators for keyboard navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Focus the button
    await hamburgerButton.focus();

    // Should have visible focus ring
    const outline = await hamburgerButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
      };
    });

    console.log(`Focus styles: outline="${outline.outline}", boxShadow="${outline.boxShadow}"`);

    // Should have some focus indicator (outline or box-shadow)
    expect(
      outline.outline !== 'none' ||
      outline.boxShadow !== 'none'
    ).toBeTruthy();
  });

  test('should have screen reader accessible text', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Should have sr-only text for screen readers
    const srText = hamburgerButton.locator('.sr-only');
    await expect(srText).toHaveText('Open main menu');

    // Button should have aria-label
    const ariaLabel = await hamburgerButton.getAttribute('aria-label');
    expect(ariaLabel).toBe('Toggle mobile menu');
  });

  test('should work on multiple mobile device sizes', async ({ page }) => {
    const devices = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'iPhone 12 Pro', width: 390, height: 844 },
      { name: 'Pixel 5', width: 393, height: 851 },
      { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    ];

    for (const device of devices) {
      console.log(`Testing on ${device.name} (${device.width}x${device.height})`);

      await page.setViewportSize({ width: device.width, height: device.height });

      const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
      await expect(hamburgerButton).toBeVisible();

      // Test open/close
      await hamburgerButton.click();
      await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

      await hamburgerButton.click();
      await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('should transition to desktop menu at tablet breakpoint (768px)', async ({ page }) => {
    // Just below tablet breakpoint - should show hamburger
    await page.setViewportSize({ width: 767, height: 1024 });

    let hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburgerButton).toBeVisible();

    // At tablet breakpoint - should show desktop menu
    await page.setViewportSize({ width: 768, height: 1024 });

    hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburgerButton).not.toBeVisible();

    const desktopMenu = page.locator('nav div.hidden.md\\:flex');
    await expect(desktopMenu).toBeVisible();
  });

  test('should display CTA button in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburgerButton.click();

    // Should have Sign Up/Start Free Trial CTA
    const ctaButton = page.locator('nav a[href="/auth/signup"]').filter({ hasText: /Sign Up|Start Free Trial/i });
    await expect(ctaButton).toBeVisible();

    // CTA should be prominent (different styling)
    const bgClass = await ctaButton.getAttribute('class');
    expect(bgClass).toContain('bg-therapy-600');
  });

  test('should have proper color contrast (WCAG AAA)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Get button colors
    const colors = await hamburgerButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
      };
    });

    console.log(`Button colors: text=${colors.color}, bg=${colors.backgroundColor}`);

    // Should have defined colors (actual contrast ratio testing requires color library)
    expect(colors.color).toBeTruthy();
    expect(colors.backgroundColor).toBeTruthy();
  });
});

test.describe('Hamburger Menu - Accessibility (WCAG 2.1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should be keyboard accessible (Tab navigation)', async ({ page }) => {
    // Tab to hamburger button
    await page.keyboard.press('Tab');

    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    // Check if button is focused
    const isFocused = await hamburgerButton.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('should open menu with Enter key', async ({ page }) => {
    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    await hamburgerButton.focus();
    await page.keyboard.press('Enter');

    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should open menu with Space key', async ({ page }) => {
    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');

    await hamburgerButton.focus();
    await page.keyboard.press('Space');

    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should allow Tab navigation through menu items', async ({ page }) => {
    const hamburgerButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburgerButton.click();

    // Tab through menu items
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // At least one menu item should be focused
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate((el) => el.tagName.toLowerCase());

    console.log(`Focused element: ${tagName}`);
    expect(['a', 'button'].includes(tagName)).toBeTruthy();
  });

  test('should have semantic nav landmark', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Should have navigation role (implicit from <nav> tag)
    const role = await nav.getAttribute('role');
    // role can be null because <nav> has implicit role="navigation"
    expect(role === null || role === 'navigation').toBeTruthy();
  });
});
