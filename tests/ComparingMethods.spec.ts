import {test, expect, Locator} from "@playwright/test"
test("Comparing methods", async ({page})=> {
  await page.goto("https://demowebshop.tricentis.com/");
  const products: Locator = page.locator('.product-title');
  // console.log(await products.nth(1).innerText());  //extract actual text of the element
  // console.log(await products.nth(1).textContent());  //returning some spaces and text
  
  const count = await products.count();

  for(let i = 0; i<count; i++) {
    //   const productName: string = await products.nth(i).innerText();
    //   console.log(productName);

    //   const productName: string | null = await products.nth(i).textContent(); //Extracts text including hidden elements, extra whitespaces, line breaks, etc.
    //   console.log(productName);

    const productName: string | null = await products.nth(i).textContent(); //Extracts text including hidden elements, extra whitespaces, line breaks, etc.
    console.log(productName?.trim());


   }

   console.log("Comparing allInnerText() VS allTextContent()");
  //  const productNames: string[] = await products.allInnerTexts();  //returns products in form of array
  //  console.log("Product Names captured by allInnerText():", productNames);

  const productNames: string[] = await products.allTextContents();
  console.log("Product Names captured by allTextContents:", productNames);  // returns an array of string, but with line breaks, spaces, etc...
  const productNamesTrimmed: string[] = productNames.map(txt => txt.trim());
  console.log("Product names after trimmed:", productNamesTrimmed);

  //all() - converts Locator to Locator[] - returns an array of locators
  const productsLocators: Locator[] = await products.all();
  console.log(productsLocators);

  console.log(await productsLocators[1].innerText());

  for(let productLocator of productsLocators) {
    console.log(await productLocator.innerText());
  }

  for (let i in productsLocators) {
    console.log(await productsLocators[i].innerText());
  }


});