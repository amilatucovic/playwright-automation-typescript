import {test, expect} from "@playwright/test";

test ("Verify page URL", async ({page})=> {
  await page.goto("https://testautomationpractice.blogspot.com/");
  let url:string = await page.url();
  console.log("URL: ", url)
  await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
});