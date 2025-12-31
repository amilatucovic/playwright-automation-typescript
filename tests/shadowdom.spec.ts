import {test, expect } from "@playwright/test"

/* All locators in Playwright by default work with elements in Shadow DOM. The exceptions are:
Locating by XPath does not pierce Shadow roots */

test("Shadow DOM handling", async ({page}) => { 
    await page.goto("https://books-pwakit.appspot.com/");
    await page.locator('#input').fill("Playwright automation");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);

    const booksFounnd = await page.locator('h2.title').all();
    console.log("Number of books found: ", booksFounnd.length);
    expect(booksFounnd.length).toBeGreaterThan(0);
});

test("Shadow DOM handling - Part II", async ({page}) => { 
    await page.goto("https://shop.polymer-project.org/");
    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();
    await page.waitForTimeout(2000);

    const products = await page.locator('div.title').all();
    console.log("Number of products found: ", products.length);
    expect(products.length).toBe(16);
    await page.waitForTimeout(2000);
});