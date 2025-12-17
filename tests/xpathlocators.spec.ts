import {test, expect, Locator} from "@playwright/test"

test("XPath demo in playwright", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // Absolute xpath - logo 
  const absoluteLogo: Locator = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[1]/a/img");
  await expect(absoluteLogo).toBeVisible();

  // Relative xpath - logo
  const relativeLogo:Locator=page.locator("//img[@alt='Tricentis Demo Web Shop']");
  await expect(relativeLogo).toBeVisible();
  // 3. contains()
  const products:Locator=page.locator("//h2/a[contains(@href, 'computer')]");
  const productsCount: number = await products.count();
  console.log("Computer related products:", productsCount);
  expect(productsCount).toBeGreaterThan(0);

  console.log("First computer related product:", await products.first().textContent());
  console.log("Last computer related product:", await products.last().textContent());
  console.log("Nth computer related product:", await products.nth(0).textContent());
  
  let productTitles:string[] = await products.allTextContents()
  console.log("All computer relared product titles:",productTitles);
  for(let pt of productTitles) {
     console.log(pt);
  };

  // start-with
  const buildingProducts: Locator = page.locator("//h2/a[starts-with(@href, '/build')]");
  const count: number = await buildingProducts.count();
  expect(count).toBeGreaterThan(0);

  // text()
  const regLink: Locator = page.locator("//a[text()='Register']");
  await expect(regLink).toBeVisible();

  //last()
  const lastItem: Locator = page.locator("//div[@class='column follow-us']//li[last()]");
  await expect(lastItem).toBeVisible();
  console.log("Text content of last element: ", await lastItem.textContent());

  //position
  const positionItem: Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
  await expect(positionItem).toBeVisible();
  console.log("Text content of positional element: ", await positionItem.textContent());

});

