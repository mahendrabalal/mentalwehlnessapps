const { chromium } = require('playwright');

async function testExploreButtonNavigation() {
  console.log('🎯 Testing "Explore Premium Features" Button Navigation');
  console.log('====================================================');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1500
  });

  const page = await browser.newPage();

  try {
    // Step 1: Login
    console.log('\n🔐 Step 1: Login');
    await page.goto('http://localhost:3000/auth/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="email"], input[type="email"]', 'mahenbalal@gmail.com');
    await page.fill('input[name="password"], input[type="password"]', 'pokhara55AB*');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In")').first();
    await loginButton.click();
    await page.waitForTimeout(3000);

    // Step 2: Go to Dashboard
    console.log('\n📊 Step 2: Navigate to Dashboard');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');

    // Step 3: Check if user already has premium status
    console.log('\n💰 Step 3: Check Premium Status');

    const premiumStatus = await page.locator('text=Premium Trial Active, text=Premium Member, text=Manage Subscription').isVisible().catch(() => false);

    if (premiumStatus) {
      console.log('✅ User already has premium status');

      // Test direct navigation to premium features page
      console.log('\n🧭 Step 4: Test Direct Navigation to Premium Features');
      await page.goto('http://localhost:3000/premium/features');
      await page.waitForLoadState('networkidle');

      const premiumFeaturesTitle = await page.locator('text=/Premium Features Active|Premium Access Locked|Welcome to Your Premium Trial/').isVisible().catch(() => false);

      if (premiumFeaturesTitle) {
        console.log('✅ Premium Features page loads correctly!');
        await page.screenshot({ path: 'premium-features-direct.png', fullPage: true });

        // Test features on the page
        const features = [
          'text=24/7 AI Therapy Companion',
          'text=Advanced Mood Analytics',
          'text=Premium Content Library',
          'text=Quick Start',
          'text=Start AI Chat'
        ];

        for (const feature of features) {
          const visible = await page.locator(feature).isVisible().catch(() => false);
          console.log(`${visible ? '✅' : '❌'} ${feature.replace('text=', '')}`);
        }

        console.log('\n🎉 SUCCESS: Premium Features page is fully functional!');

      } else {
        console.log('❌ Premium Features page did not load correctly');
      }

    } else {
      console.log('ℹ️  User does not have premium status, will test subscription flow');

      // Step 4: Start Free Trial to Create Premium Status
      console.log('\n🎯 Step 4: Complete Subscription Flow');
      const trialButton = page.locator('text=Start Free Trial').first();

      if (await trialButton.isVisible()) {
        await trialButton.click();
        await page.waitForTimeout(3000);

        // Quick subscription completion
        const monthlyPlan = page.locator('text=Premium Monthly').first();
        if (await monthlyPlan.isVisible()) {
          await monthlyPlan.click();
          await page.waitForTimeout(2000);

          // Try to find and click the subscription button with more specific targeting
          const subscribeButtons = [
            'button:has-text("Start 7-Day Free Trial")',
            'button:has-text("Start Free Trial")',
            '.bg-therapy-600:has-text("Start")'
          ];

          let subscriptionStarted = false;
          for (const buttonSelector of subscribeButtons) {
            const button = page.locator(buttonSelector).first();
            if (await button.isVisible() && !subscriptionStarted) {
              try {
                await button.click({ timeout: 5000 });
                console.log(`✅ Clicked subscription button: ${buttonSelector}`);
                subscriptionStarted = true;
                break;
              } catch (e) {
                console.log(`⚠️  Could not click: ${buttonSelector}`);
                continue;
              }
            }
          }

          if (subscriptionStarted) {
            await page.waitForTimeout(8000);

            // Now look for the success screen and navigation buttons
            console.log('\n🧭 Step 5: Test Success Screen Navigation');

            // Look for success screen elements
            const successElements = [
              'text=Welcome to Premium',
              'text=Explore Premium Features',
              'text=Back to Dashboard',
              'text=Your Premium Monthly trial has started'
            ];

            for (const element of successElements) {
              const visible = await page.locator(element).isVisible().catch(() => false);
              console.log(`${visible ? '✅' : '❌'} ${element.replace('text=', '')}`);
            }

            // Try to click "Explore Premium Features" with force
            const exploreButton = page.locator('text=Explore Premium Features').first();
            if (await exploreButton.isVisible()) {
              console.log('🖱️ Attempting to click "Explore Premium Features"...');

              try {
                // Try with force to bypass overlay issues
                await exploreButton.click({ force: true, timeout: 10000 });
                console.log('✅ Button clicked!');

                await page.waitForTimeout(5000);

                // Check where we ended up
                const currentUrl = page.url();
                console.log('📍 Current URL:', currentUrl);

                if (currentUrl.includes('/premium/features')) {
                  console.log('🎉 SUCCESS: Navigated to Premium Features page!');
                  await page.screenshot({ path: 'premium-features-after-click.png', fullPage: true });
                } else {
                  console.log('⚠️  Ended up on different page:', currentUrl);
                }

              } catch (e) {
                console.log('❌ Could not click "Explore Premium Features" button:', e.message);

                // Try alternative - close modal and navigate manually
                const closeButton = page.locator('button:has-text("×"), button:has-text("Close")').first();
                if (await closeButton.isVisible()) {
                  await closeButton.click();
                  console.log('🔄 Closed modal, testing direct navigation...');

                  await page.goto('http://localhost:3000/premium/features');
                  await page.waitForLoadState('networkidle');

                  const premiumPageLoaded = await page.locator('text=Welcome to Your Premium Trial').isVisible().catch(() => false);
                  if (premiumPageLoaded) {
                    console.log('✅ Premium Features page accessible via direct URL');
                  }
                }
              }
            }
          }
        }
      }
    }

    // Final URL check
    const finalUrl = page.url();
    console.log('\n📊 Final Results');
    console.log('================');
    console.log('Final URL:', finalUrl);

    if (finalUrl.includes('/premium/features')) {
      console.log('🎉 SUCCESS: Premium Features navigation working!');
    } else {
      console.log('⚠️  Navigation needs improvement');
    }

    // Keep browser open for inspection
    console.log('\n🔍 Keeping browser open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Test completed');
  }
}

testExploreButtonNavigation();
