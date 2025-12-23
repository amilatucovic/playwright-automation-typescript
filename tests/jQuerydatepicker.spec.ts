import {test, expect, Locator, Page} from "@playwright/test"

async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
  
   while(true) {
   const currentMonth = await page.locator('.ui-datepicker-month').textContent();
   const currentYear = await page.locator('.ui-datepicker-year').textContent();
   if(currentMonth === targetMonth && currentYear === targetYear) {
    break;
   }
   
   if(isFuture) {
       await page.locator('.ui-datepicker-next').click();
   }
   else {
     await page.locator('.ui-datepicker-prev').click();
   }
   
   //await page.waitForTimeout(3000);


 }


  const allDates = await page.locator(".ui-datepicker-calendar td").all();
  for(let dte of allDates) {
    const dateText = await dte.innerText();
    if(dateText===targetDate) {
      await dte.click();
      break;
   }
 }
}

test("jQuery datepicker", async ({page}) => {
 await page.goto("https://testautomationpractice.blogspot.com/");
 const dateInput: Locator = page.locator('#datepicker');
 expect(dateInput).toBeVisible();

 //dateInput.fill("12/22/2025");
 
await dateInput.click();
 
//  const year = '2026';
//  const month = 'December';
//  const date = '15';

 const year = '2024';
 const month = 'December';
 const date = '15';

 selectDate(year, month, date, page, false);
 const expectedDate ='12/15/2024';
 await expect(dateInput).toHaveValue(expectedDate);
 await page.waitForTimeout(5000);

});