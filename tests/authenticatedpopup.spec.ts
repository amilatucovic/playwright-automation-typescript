import {test, expect, chromium} from "@playwright/test"

test("Authenticated popup", async ({browser}) => {
  // Approach 2: pass the login along with browser context - better way
   const context = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}});
   const page = await context.newPage();
   await page.goto("https://the-internet.herokuapp.com/basic_auth");
  //Approach 1 - pass login along with URL
  //await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
   await page.waitForLoadState(); // wait for page loaded completely
   await expect(page.locator('text=Congratulations')).toBeVisible();
   await page.waitForTimeout(5000);
  
  
  
});