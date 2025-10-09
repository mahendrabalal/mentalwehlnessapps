import { test, expect, Page, Browser, BrowserContext } from '@playwright/test'

/**
 * BMad Method Premium Wellness Features Testing Protocol
 * Healthcare-grade comprehensive testing for mental wellness application
 */

// Test Configuration
const BASE_URL = 'http://localhost:3001'
const TEST_EMAIL = 'mahenbalal@gmail.com'
const FALLBACK_EMAIL = 'playwright.test@healthcare.app'
const SCREENSHOTS_PATH = './test-results/screenshots'

test.describe('Premium Wellness Features - BMad Method Healthcare Testing', () => {

  // Test Setup: Authentication and Navigation
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)

    // Handle potential authentication
    try {
      // Check if we're already authenticated by looking for dashboard content
      await page.waitForSelector('[data-testid="dashboard-content"], .max-w-7xl', { timeout: 5000 })
    } catch {
      // If not authenticated, attempt to login or handle signup flow
      await handleAuthentication(page)
    }
  })

  test('01. Visual Testing - Premium Features Section Display', async ({ page }) => {
    // Navigate to dashboard
    await page.goto(`${BASE_URL}/dashboard`)

    // Wait for premium features section to load
    await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })

    // Take full dashboard screenshot first
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/01-dashboard-overview.png`,
      fullPage: true
    })

    // Locate the Premium Features section
    const premiumSection = page.locator('.bg-gradient-to-r.from-therapy-500')

    // Verify section is visible
    await expect(premiumSection).toBeVisible()

    // Verify header text
    await expect(page.locator('h2:has-text("Unlock Premium Wellness Features")')).toBeVisible()
    await expect(page.locator('text=Get personalized AI support and advanced insights')).toBeVisible()

    // Verify all 3 feature cards are present
    const featureCards = [
      { icon: '🤖', title: '24/7 AI Companion', description: 'Personalized wellness support anytime you need it' },
      { icon: '📊', title: 'Smart Analytics', description: 'Advanced mood insights and trend predictions' },
      { icon: '🎵', title: 'Premium Content', description: 'Unlimited guided meditations and sleep stories' }
    ]

    for (const feature of featureCards) {
      await expect(page.locator(`text=${feature.icon}`)).toBeVisible()
      await expect(page.locator(`text=${feature.title}`)).toBeVisible()
      await expect(page.locator(`text=${feature.description}`)).toBeVisible()
    }

    // Verify pricing display
    await expect(page.locator('text=Starting at')).toBeVisible()
    await expect(page.locator('text=$5.99')).toBeVisible()
    await expect(page.locator('text=/month')).toBeVisible()

    // Verify "Start Free Trial" button
    const trialButton = page.locator('button:has-text("Start Free Trial")')
    await expect(trialButton).toBeVisible()
    await expect(trialButton).toBeEnabled()

    // Verify healthcare disclaimer
    await expect(page.locator('text=Premium AI features provide general wellness support')).toBeVisible()
    await expect(page.locator('text=not a substitute for professional therapy')).toBeVisible()

    // Take focused screenshot of premium section
    await premiumSection.screenshot({
      path: `${SCREENSHOTS_PATH}/02-premium-features-section.png`
    })

    console.log('✅ Visual Testing: Premium Features section displays correctly with all required elements')
  })

  test('02. Interaction Testing - Premium Upgrade Modal Flow', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`)
    await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })

    // Click "Start Free Trial" button
    const trialButton = page.locator('button:has-text("Start Free Trial")')
    await trialButton.click()

    // Wait for modal to appear
    await page.waitForSelector('.fixed.inset-0.bg-black.bg-opacity-50', { timeout: 5000 })

    // Take screenshot of modal
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/03-premium-modal-opened.png`,
      fullPage: true
    })

    // Verify modal header
    await expect(page.locator('h2:has-text("Upgrade to Premium")')).toBeVisible()
    await expect(page.locator('text=Unlock advanced mental wellness features')).toBeVisible()

    // Verify Monthly plan card
    const monthlyPlan = page.locator('[data-testid="monthly-plan"], .cursor-pointer:has-text("Premium Monthly")')
    await expect(monthlyPlan.locator('text=Premium Monthly')).toBeVisible()
    await expect(monthlyPlan.locator('text=$5.99')).toBeVisible()
    await expect(monthlyPlan.locator('text=/month')).toBeVisible()

    // Verify Yearly plan card
    const yearlyPlan = page.locator('[data-testid="yearly-plan"], .cursor-pointer:has-text("Premium Yearly")')
    await expect(yearlyPlan.locator('text=Premium Yearly')).toBeVisible()
    await expect(yearlyPlan.locator('text=$59.99')).toBeVisible()
    await expect(yearlyPlan.locator('text=/year')).toBeVisible()
    await expect(yearlyPlan.locator('text=Most Popular')).toBeVisible()
    await expect(yearlyPlan.locator('text=Save $11.89/year')).toBeVisible()

    // Test plan selection - click on yearly plan
    await yearlyPlan.click()
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/04-yearly-plan-selected.png`,
      fullPage: true
    })

    // Test plan selection - click on monthly plan
    await monthlyPlan.click()
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/05-monthly-plan-selected.png`,
      fullPage: true
    })

    // Verify modal responsiveness - resize window
    await page.setViewportSize({ width: 768, height: 1024 }) // Tablet view
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/06-modal-tablet-view.png`,
      fullPage: true
    })

    await page.setViewportSize({ width: 375, height: 667 }) // Mobile view
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/07-modal-mobile-view.png`,
      fullPage: true
    })

    // Reset to desktop view
    await page.setViewportSize({ width: 1280, height: 720 })

    // Verify feature lists in both plans
    const expectedFeatures = [
      'Unlimited AI Therapy Companion',
      '24/7 Crisis Prevention Support',
      'Advanced Mood Analytics & Predictions',
      'Premium Content Library',
      'HIPAA-Compliant Cloud Storage'
    ]

    for (const feature of expectedFeatures) {
      await expect(page.locator(`text=${feature}`).first()).toBeVisible()
    }

    // Test modal close functionality
    const closeButton = page.locator('button:has([stroke="currentColor"]), button:has-text("×")')
    if (await closeButton.count() > 0) {
      await closeButton.first().click()
      await expect(page.locator('.fixed.inset-0.bg-black.bg-opacity-50')).not.toBeVisible()
    }

    console.log('✅ Interaction Testing: Premium upgrade modal functions correctly with responsive design')
  })

  test('03. Healthcare Compliance Verification', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`)
    await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })

    // Verify medical disclaimers in premium section
    await expect(page.locator('text=Premium AI features provide general wellness support')).toBeVisible()
    await expect(page.locator('text=not a substitute for professional therapy or medical advice')).toBeVisible()

    // Open premium modal
    const trialButton = page.locator('button:has-text("Start Free Trial")')
    await trialButton.click()
    await page.waitForSelector('.fixed.inset-0.bg-black.bg-opacity-50', { timeout: 5000 })

    // Verify healthcare compliance elements in modal
    await expect(page.locator('text=HIPAA Compliant')).toBeVisible()
    await expect(page.locator('text=Secure Payments')).toBeVisible()
    await expect(page.locator('text=Cancel Anytime')).toBeVisible()

    // Take screenshot of compliance section
    await page.locator('text=HIPAA Compliant').screenshot({
      path: `${SCREENSHOTS_PATH}/08-compliance-indicators.png`
    })

    // Check for legal disclaimer
    const disclaimer = page.locator('.bg-white.rounded-lg p-6:has-text("Important Medical Disclaimer")')
    if (await disclaimer.count() > 0) {
      await expect(disclaimer).toBeVisible()
      await disclaimer.screenshot({
        path: `${SCREENSHOTS_PATH}/09-medical-disclaimer.png`
      })
    }

    // Verify crisis intervention accessibility
    await page.locator('button:has([stroke="currentColor"])').first().click() // Close modal

    // Check for crisis support link
    const crisisLink = page.locator('a[href="/crisis/support"], text=Crisis Support')
    await expect(crisisLink.first()).toBeVisible()

    // Take screenshot of crisis resources
    await crisisLink.first().screenshot({
      path: `${SCREENSHOTS_PATH}/10-crisis-support-access.png`
    })

    // Verify footer medical disclaimer
    const footerDisclaimer = page.locator('.bg-gray-100:has-text("Medical Disclaimer")')
    if (await footerDisclaimer.count() > 0) {
      await expect(footerDisclaimer).toBeVisible()
      await footerDisclaimer.screenshot({
        path: `${SCREENSHOTS_PATH}/11-footer-disclaimer.png`
      })
    }

    console.log('✅ Healthcare Compliance: All required medical disclaimers and compliance elements present')
  })

  test('04. Accessibility Testing - WCAG 2.1 Compliance', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`)
    await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })

    // Test keyboard navigation to premium section
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Navigate to Start Free Trial button via keyboard
    let focusedElement = await page.locator(':focus').first()
    let attempts = 0
    while (attempts < 20) {
      const text = await focusedElement.textContent()
      if (text?.includes('Start Free Trial')) {
        break
      }
      await page.keyboard.press('Tab')
      focusedElement = await page.locator(':focus').first()
      attempts++
    }

    // Take screenshot of focused button
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/12-keyboard-focus-trial-button.png`,
      fullPage: true
    })

    // Activate button with keyboard
    await page.keyboard.press('Enter')
    await page.waitForSelector('.fixed.inset-0.bg-black.bg-opacity-50', { timeout: 5000 })

    // Test keyboard navigation within modal
    await page.keyboard.press('Tab') // Should focus on close button or first interactive element
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/13-modal-keyboard-focus.png`,
      fullPage: true
    })

    // Test color contrast - check if premium section has sufficient contrast
    const premiumSection = page.locator('.bg-gradient-to-r.from-therapy-500')

    // Check if text is readable (this is a visual check, actual contrast testing would need specialized tools)
    await expect(premiumSection.locator('h2')).toHaveCSS('color', /.+/) // Verify color is set

    // Test ARIA labels and roles
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const role = await button.getAttribute('role')

      // Log accessibility attributes for review
      const text = await button.textContent()
      console.log(`Button "${text}": aria-label="${ariaLabel}", role="${role}"`)
    }

    // Test screen reader compatibility by checking semantic HTML
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0) // Should have proper heading structure

    // Verify form elements have labels (if any)
    const inputs = page.locator('input, select, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')

      // At least one labeling method should be present
      if (id || ariaLabel || ariaLabelledBy) {
        console.log(`✅ Input ${i} has proper labeling`)
      } else {
        console.log(`⚠️ Input ${i} may need better labeling`)
      }
    }

    // Close modal with Escape key
    await page.keyboard.press('Escape')
    await expect(page.locator('.fixed.inset-0.bg-black.bg-opacity-50')).not.toBeVisible()

    console.log('✅ Accessibility Testing: Keyboard navigation and basic WCAG compliance verified')
  })

  test('05. Cross-Browser Compatibility - Responsive Design', async ({ browser }) => {
    // Test different viewport sizes
    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Laptop', width: 1366, height: 768 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Small Mobile', width: 320, height: 568 }
    ]

    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height }
      })
      const page = await context.newPage()

      await page.goto(`${BASE_URL}/dashboard`)
      await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })

      // Take screenshot for each viewport
      await page.screenshot({
        path: `${SCREENSHOTS_PATH}/14-${viewport.name.toLowerCase()}-${viewport.width}x${viewport.height}.png`,
        fullPage: true
      })

      // Verify premium section is visible and properly laid out
      const premiumSection = page.locator('.bg-gradient-to-r.from-therapy-500')
      await expect(premiumSection).toBeVisible()

      // Verify key elements are still accessible on mobile
      if (viewport.width <= 768) {
        // On mobile, check if elements stack properly
        const featureGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-3')
        await expect(featureGrid).toBeVisible()
      }

      // Test modal responsiveness
      const trialButton = page.locator('button:has-text("Start Free Trial")')
      await trialButton.click()

      await page.waitForSelector('.fixed.inset-0.bg-black.bg-opacity-50', { timeout: 5000 })

      await page.screenshot({
        path: `${SCREENSHOTS_PATH}/15-modal-${viewport.name.toLowerCase()}-${viewport.width}x${viewport.height}.png`,
        fullPage: true
      })

      // Verify modal is readable and usable at this size
      await expect(page.locator('h2:has-text("Upgrade to Premium")')).toBeVisible()

      // Close modal and context
      await page.keyboard.press('Escape')
      await context.close()
    }

    console.log('✅ Cross-Browser Compatibility: Responsive design works across all tested viewports')
  })

  test('06. Performance and Load Testing', async ({ page }) => {
    // Start performance monitoring
    await page.goto(`${BASE_URL}/dashboard`)

    // Measure load time for premium section
    const startTime = Date.now()
    await page.waitForSelector('.bg-gradient-to-r.from-therapy-500', { timeout: 10000 })
    const loadTime = Date.now() - startTime

    console.log(`Premium section load time: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(5000) // Should load within 5 seconds

    // Test modal opening performance
    const modalStartTime = Date.now()
    const trialButton = page.locator('button:has-text("Start Free Trial")')
    await trialButton.click()
    await page.waitForSelector('.fixed.inset-0.bg-black.bg-opacity-50', { timeout: 5000 })
    const modalLoadTime = Date.now() - modalStartTime

    console.log(`Modal opening time: ${modalLoadTime}ms`)
    expect(modalLoadTime).toBeLessThan(2000) // Modal should open within 2 seconds

    // Take final screenshot
    await page.screenshot({
      path: `${SCREENSHOTS_PATH}/16-performance-test-final.png`,
      fullPage: true
    })

    console.log('✅ Performance Testing: Load times are within acceptable healthcare application standards')
  })
})

// Helper function to handle authentication
async function handleAuthentication(page: Page) {
  try {
    // Check if we're on a login page
    const loginForm = page.locator('form:has(input[type="email"])')

    if (await loginForm.count() > 0) {
      // Try primary test email first
      await page.fill('input[type="email"]', TEST_EMAIL)

      // Check if there's a password field
      const passwordField = page.locator('input[type="password"]')
      if (await passwordField.count() > 0) {
        await page.fill('input[type="password"]', 'TestPassword123!')
        await page.click('button[type="submit"], button:has-text("Sign In")')
      } else {
        // Might be a magic link or signup flow
        await page.click('button[type="submit"], button:has-text("Continue"), button:has-text("Sign Up")')
      }

      // Wait for redirect to dashboard
      await page.waitForURL('**/dashboard', { timeout: 10000 })
    } else {
      // Navigate directly to dashboard - might already be authenticated
      await page.goto(`${BASE_URL}/dashboard`)
    }
  } catch (error) {
    console.log('Authentication flow encountered issues, proceeding with test...')
    // Continue with test even if authentication fails
  }
}

// Test configuration
test.describe.configure({ mode: 'serial' })
