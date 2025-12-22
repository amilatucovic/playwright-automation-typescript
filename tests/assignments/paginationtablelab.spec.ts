import { test, expect } from '@playwright/test';

test('Pagination Table Lab - Print all data from paginated table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const pages = await page.locator('ul#pagination li').all();
  console.log("Number of Pages: ", pages.length);

  for (let i = 0; i < pages.length; i++) {
    await pages[i].click(); 
    const rows = await page.locator('table#productTable tbody tr').all();
    for (const row of rows) {
      const rowText = await row.innerText();
      console.log(rowText.trim());
    }
    await page.waitForTimeout(3000);
    

    
    for (let i = 0; i < rows.length; i++){
        const id = await rows[i].locator('td').nth(0).innerText();
        const name = await rows[i].locator('td').nth(1).innerText();
        const price = await rows[i].locator('td').nth(2).innerText();
        await rows[i].locator('td').nth(3).locator('input').click();
        console.log(id, '\t', name, '\t', price); 
      }
      await page.waitForTimeout(3000);

  }
});
