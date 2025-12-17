import {test, expect} from "@playwright/test";

/*
// Syntax:
test("title", () = > {
  // step 1
  // step 2
  // step 3

});

*/

// fixture - global variabl : page, browser
// All steps will return a promise
test ("Verify page title", async ({page})=> {
  await page.goto("http://www.automationpractice.pl/index.php");
  let title:string = await page.title();
  console.log("Title", title);
  await expect(page).toHaveTitle(title);
});