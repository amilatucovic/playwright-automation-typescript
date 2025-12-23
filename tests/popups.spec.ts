import {test, expect, chromium} from "@playwright/test"

test("Handle popups", async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
//   page.waitForEvent('popup');
//   await page.locator("#PopUp").click();
  await Promise.all([page.waitForEvent('popup'),await page.locator("#PopUp").click()]);
  const allPopUpWindows = context.pages();
  console.log("Number of pages/windows: ", allPopUpWindows.length);
  console.log(allPopUpWindows[0].url());
  console.log(allPopUpWindows[1].url());

  for(const pw of allPopUpWindows) {
     const title = await pw.title();
     if(title.includes('Playwright')) {
        await pw.locator('.getStarted_Sjon').click();
        await page.waitForTimeout(5000);
        await pw.close();
     }
  }

  await page.waitForTimeout(5000);
  
  
  
});