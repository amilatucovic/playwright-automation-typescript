import {test, expect, Locator} from "@playwright/test"

test("Multi Select Dropdown", async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  // 1. select option from the dropdown (4 ways)
  //await page.locator("#colors").selectOption(['Red', 'Blue', 'Green']);  // using visible text
  //await page.locator("#colors").selectOption(['red', 'green', 'white']); // using value attribute
  // await page.locator("#colors").selectOption([{label: 'Red'}, {label:'Green'}, {label:'Yellow'}]);
  // await page.locator("#colors").selectOption([{index:0}, {index:2}, {index:4}]);

  // 2. check number of options
  const dropdownOptions: Locator = page.locator("#colors>option");
  await expect(dropdownOptions).toHaveCount(7);


  // 3. check an option present in the dropdown
  const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
   console.log(optionsText);
   
   expect(optionsText).toContain('Green');

   // 4. printing options from the dropdown
   for (const option of optionsText) {
     console.log(option);
    };
   
    await page.waitForTimeout(3000);
  
});

