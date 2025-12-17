import {test, expect, Locator} from "@playwright/test"

test("Verify dropdown contains duplicates", async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  const colorOptions: Locator = page.locator("#colors>option"); //having duplicates
  //const dropdownOptions: Locator = page.locator("#animals>option"); //not having duplicates
  const optionsText:string[] = (await colorOptions.allTextContents()).map(txt => txt.trim());
  const mySet=new Set<string>();
  const duplicates:string[]=[];

  for(const txt of optionsText) {
    if(mySet.has(txt)) {
      duplicates.push(txt);
    }
    else{
       mySet.add(txt);
    }
  }
  console.log("Duplicate options are: ",duplicates);
  if(duplicates.length>0) {
    console.log("Duplicate options found", duplicates);
  }
  else{
    console.log("No duplicate options found...")
  }
  expect(duplicates.length).toBe(2);

  
 // await page.waitForTimeout(3000);
});

