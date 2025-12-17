import {test, expect, Locator} from "@playwright/test"

test("Verify dropdown is Sorted", async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  const dropdownOptions: Locator = page.locator("#colors>option");
  //console.log(await dropdownOptions.allTextContents());
  //const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
 // const originalList:string[]=optionsText;
  //const sortedList:string[]=optionsText.sort();
  //console.log("Original list: ", originalList);
  //console.log("Sorted list: ", sortedList);
  

  // muteable - original value is changed
  const optionsText: string[] = (await dropdownOptions.allTextContents()).map(txt => txt.trim());
  const originalList:string[]=[...optionsText];
  const sortedList:string[]=[...optionsText].sort();
  console.log("Original list: ", originalList);
  console.log("Sorted list: ", sortedList);

  expect(originalList).toEqual(sortedList);
 // await page.waitForTimeout(3000);
});

