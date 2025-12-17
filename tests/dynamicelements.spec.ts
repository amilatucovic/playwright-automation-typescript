import {test, expect, Locator} from "@playwright/test";
// test('Handle Dynamic Elements using XPath', async ({page}) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");

//   for(let i=1; i<=5; i++) {
//     let button:Locator = page.locator('//button[text()="STOP" or text()="START"]');
//     await button.click();
//     await page.waitForTimeout(2000);
//   }
// });


// Using Playwright specific locators:
test('Handle Dynamic Elements using PW Locators', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  for(let i=1; i<=5; i++) {
    let button:Locator = page.getByRole('button', { name: /START|STOP/});
    await button.click();
    await page.waitForTimeout(2000);
  }
});

// Uvijek prvo treba koristiti playwright lokatore pa ako ne nadjemo trazeni element onda tek
// CSS lokatore pa tek kada nema ni PW niti CSS lokatora, tek tada razmatrati XPath lokatore
// XPath lokatori su dosta sporiji dok su PW lokatori jako brzi