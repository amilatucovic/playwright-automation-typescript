import { test, expect, Locator } from "@playwright/test";
// Lcator is also one of the pixture
/*test("Verify Playwright Locators", async ({ page, context, browser }) => {
  
  

  await page.goto("https://demo.nopcommerce.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  //const logo: Locator = page.getByAltText("nopCommerce demo store");  //this locator is available only for images because only images have alt property

  //await expect(logo).toBeVisible();
  // await expect(page.getByText("Welcome to our store")).toBeVisible();  //provided full string
  // await expect(page.getByText("Welcome to")).toBeVisible();      // provided substring
  //await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();  //regular expression
  await page
     .getByRole("link", { name: "Register" })
     .waitFor({ state: "visible" });
   await page.getByRole("link", { name: "Register" }).click();
   await page.waitForTimeout(2000);
   await page.getByText("Verify you are human").click();
   await page.locator("input").click();
   //await page.getByRole("checkbox").click();
   await page.waitForTimeout(2000);
   await expect(page.getByRole("heading", {name:'Register'})).toBeVisible();  //pada
  
  await page.getByLabel("First name").fill("John"); //pada
  await page.getByLabel("Last name").fill("Kenedy"); //pada

  // await page.getByPlaceholder("Search store").fill('Apple MacBook Pro');
});
 */

test("Verify Playwright Locators", async ({ page }) => {

  await page.goto("https://demo.nopcommerce.com/");

  
  await page.route("**/turnstile/**", route => route.abort());
  await page.route("**cloudflare**", route => route.abort());
  await page.route("**/challenge**", route => route.abort());

    

await page.getByRole("link", { name: "Register" }).click();
await page.waitForTimeout(1000);

await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
await page.waitForTimeout(1000);

await page.getByLabel("First name").fill("John");
await page.waitForTimeout(1000);

await page.getByLabel("Last name").fill("Kenedy");
await page.waitForTimeout(1000);

});

