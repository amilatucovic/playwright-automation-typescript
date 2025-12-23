import {test, expect, Page, chromium} from "@playwright/test"
// test("Browser context demo", async({context}) => {
//   const page: Page = await context.newPage();
//   await page.goto("https://testautomationpractice.blogspot.com/");
// });

test("Browser context demo", async() => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  console.log("Number of pages created: ", context.pages().length);
  await page1.goto("https://testautomationpractice.blogspot.com/");
  await expect(page1).toHaveTitle("Automation Testing Practice");
  await page2.goto("https://playwright.dev/");
  await expect(page2).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
  await page1.waitForTimeout(5000);
  await page2.waitForTimeout(5000);
});