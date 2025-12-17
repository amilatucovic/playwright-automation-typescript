import {test, expect, Locator} from "@playwright/test"

test("Single Select Dropdown", async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  // 4 su moguca nacina kako koristiti lokatore za ovaj dropdown
  //await page.locator("#country").selectOption('India');  //visible text
  //await page.locator("#country").selectOption({value: 'uk'});
  //await page.locator("#country").selectOption({label: 'India'});
  //await page.locator("#country").selectOption({index:3});
  
   // check number of options in the dropdown (count)
   const dropdownOptions: Locator = page.locator("#country>option");
   await expect(dropdownOptions).toHaveCount(10);
   
   // check an option present in the dropdown

   const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
   console.log(optionsText);
   
   expect(optionsText).toContain('Japan');

   // printing options from the dropdown
   for(const option of optionsText ){
      console.log(option);
   }
   await page.waitForTimeout(3000);

});

