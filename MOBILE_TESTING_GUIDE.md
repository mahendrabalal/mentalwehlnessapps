# Mobile Optimization Testing Guide

## Quick Start

### Prerequisites
```bash
# Install Playwright browsers (one-time setup)
npx playwright install
```

### Running Mobile Tests

#### Option 1: Automated (Recommended)
Tests will start the dev server automatically:

```bash
# Run all mobile tests on Pixel 5 (Android)
npx playwright test tests/mobile-optimization.spec.ts --project=mobile-chrome

# Run on iPhone 12 Pro (iOS Safari)
npx playwright test tests/mobile-optimization.spec.ts --project=mobile-safari

# Run on iPad Mini (Tablet)
npx playwright test tests/mobile-optimization.spec.ts --project=tablet

# Run on all mobile devices
npx playwright test tests/mobile-optimization.spec.ts
```

#### Option 2: Manual Server Control
If you prefer to control the dev server yourself:

1. **Start the dev server:**
```bash
cd apps/web
PORT=3003 npm run dev
```

2. **Run tests in another terminal:**
```bash
npx playwright test tests/mobile-optimization.spec.ts --project=mobile-chrome
```

3. **Stop server when done:**
```bash
# Press Ctrl+C in the server terminal
```

### View Test Results

#### HTML Report (Interactive)
```bash
npx playwright show-report
```

#### Command Line Summary
```bash
npx playwright test tests/mobile-optimization.spec.ts --reporter=list
```

#### JSON Results
```bash
npx playwright test tests/mobile-optimization.spec.ts --reporter=json --output=results.json
```

### Debug Tests

#### UI Mode (Visual Debugging)
```bash
npx playwright test tests/mobile-optimization.spec.ts --ui
```

#### Debug Specific Test
```bash
npx playwright test tests/mobile-optimization.spec.ts --debug --grep="viewport"
```

#### Screenshots on Failure
Screenshots are automatically saved to `test-results/` when tests fail.

## Test Coverage

### Core Mobile Requirements ✅
- ✅ Viewport meta tag configuration
- ✅ No horizontal scroll
- ✅ Touch-friendly navigation (44px min)
- ✅ Readable font sizes (16px+)
- ✅ Image optimization & alt text
- ✅ Hero section rendering
- ✅ CTA button prominence
- ✅ Fixed positioning limits
- ✅ Long content scrolling

### Performance Metrics 📊
- ✅ Page load time (<3s)
- ✅ First Contentful Paint (<2.5s)
- ✅ JavaScript bundle size
- ✅ Critical CSS loading

### Accessibility (WCAG 2.1) ♿
- ✅ Heading hierarchy
- ✅ Semantic landmarks
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Screen reader support

### Mobile UX 📱
- ✅ Pinch-to-zoom enabled
- ✅ Form input sizing (iOS)
- ✅ Element spacing (8px min)
- ✅ Landscape orientation

## Configuration

### Device Viewports
Configured in `playwright.config.ts`:

```typescript
projects: [
  { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },        // 393x851
  { name: 'mobile-safari', use: { ...devices['iPhone 12 Pro'] } },  // 390x844
  { name: 'tablet', use: { ...devices['iPad Mini'] } },             // 768x1024
]
```

### Test Timeouts
- Default: 30 seconds per test
- Configurable via `--timeout` flag:
```bash
npx playwright test tests/mobile-optimization.spec.ts --timeout=60000
```

## Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3000-3003
lsof -ti:3000,3001,3002,3003 | xargs kill -9

# Or use a different port
PORT=3005 npm run dev
```

### Server Not Starting
```bash
# Clean Next.js cache
cd apps/web
rm -rf .next
npm run build
PORT=3003 npm run dev
```

### Tests Timing Out
```bash
# Increase timeout
npx playwright test tests/mobile-optimization.spec.ts --timeout=60000

# Run fewer tests
npx playwright test tests/mobile-optimization.spec.ts --grep="Core Requirements"
```

### Middleware Errors
```bash
# Clear build and restart
cd apps/web
rm -rf .next
npm run dev
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Mobile Tests

on: [push, pull_request]

jobs:
  mobile-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run mobile tests
        run: npx playwright test tests/mobile-optimization.spec.ts

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

### 1. Run Before Each PR
```bash
npm run test:mobile  # Add this script to package.json
```

### 2. Test on Multiple Devices
```bash
npx playwright test tests/mobile-optimization.spec.ts --project=mobile-chrome --project=mobile-safari
```

### 3. Monitor Performance Trends
- Track FCP, LCP, CLS over time
- Set performance budgets
- Fail builds on regression

### 4. Real Device Testing
For final validation, test on actual devices:
- iOS: Safari on iPhone/iPad
- Android: Chrome on Pixel/Samsung
- Use BrowserStack or Sauce Labs for cloud devices

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Viewport meta tag missing | Add to `<Head>` in `pages/index.tsx` |
| Horizontal scroll | Check for fixed widths, use `max-width: 100%` |
| Small touch targets | Minimum 44x44px for buttons/links |
| Slow FCP | Inline critical CSS, optimize fonts |
| Missing alt text | Add to all `<img>` tags |
| No mobile menu | Implement hamburger menu <768px |

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Core Web Vitals](https://web.dev/vitals/)
- [Playwright Documentation](https://playwright.dev)

## Next Steps

1. ✅ Fix critical issues from report
2. ✅ Re-run tests to verify fixes
3. ✅ Add to CI/CD pipeline
4. ✅ Test on real devices
5. ✅ Monitor performance metrics

---

**Last Updated:** October 8, 2025
**Test Suite:** [tests/mobile-optimization.spec.ts](tests/mobile-optimization.spec.ts)
**Full Report:** [MOBILE_OPTIMIZATION_REPORT.md](MOBILE_OPTIMIZATION_REPORT.md)
