import {test, expect, Locator} from "@playwright/test"

test("Verify Order by dropdown", async ({page})=>{
  await page.goto("https://www.bstackdemo.com/");
  
  const orderByDropdown: Locator = page.locator("div.sort>select");
  await expect(orderByDropdown).toBeVisible();
  await expect(orderByDropdown).toBeEnabled();
  await orderByDropdown.selectOption({label: 'Lowest to highest'});
  
  await page.waitForTimeout(3000);

  const productPriceElements: Locator = page.locator("div.val");
  const productNameElements: Locator = page.locator("p.shelf-item__title");

  const prices: string[] = await productPriceElements.allTextContents();
  const names: string[] = await productNameElements.allTextContents();

  expect(prices.length).toBe(names.length);

  console.log("----Products with its corresponding prices:----");
  for (let i = 0; i<names.length; i++) {
    console.log(`${names[i]} - ${prices[i]}`);
  }
  console.log("-------------------------------------------------------");
  console.log(`Lowest price has product: ${names[0]} - ${prices[0]}`);
  console.log(`Highest price has product: ${names[names.length-1]} - ${prices[prices.length-1]}`);


  
});