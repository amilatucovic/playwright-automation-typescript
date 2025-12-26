import {test, expect, chromium} from "@playwright/test"

test("Browser settings", async () => {
  const browser = await chromium.launch({headless: false});  // runs in headed mode - we can see UI
  const context = await browser.newContext(
    {
        viewport: { width: 1280, height: 720 },
        locale:  'en-US'
        // proxy: {server: 'http://myproxy.com:3245'}
        // ignoreHTTPSErrors: true, //handle SSL certificate errors
    }
    
  );
  const page = await context.newPage();
  await page.goto("https://www.google.com/");
  await page.waitForTimeout(5000);
});