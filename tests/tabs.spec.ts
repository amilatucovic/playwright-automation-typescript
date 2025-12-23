import {test, expect, chromium} from "@playwright/test"

test("Handle tabs", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const parentPage = await context.newPage();
  await parentPage.goto("https://testautomationpractice.blogspot.com/");
// context.waitForEvent('page');
//   parentPage.locator("button:has-text('New Tab')").click();  //opens new tab/new page
  const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()]);

  // Approach 1: switch between pages and get titles (using context)
  const pages = context.pages();
  console.log("Numver of pages created: ", pages.length);
  console.log("Title of the Parent page", await pages[0].title());
  console.log("Title of the Child page", await pages[1].title());

  // Approach 2: alternative
  console.log("Title of the Parent page", await parentPage.title());
  console.log("Title of the Child page", await childPage.title());
  
});