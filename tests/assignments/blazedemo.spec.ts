import { test, expect } from '@playwright/test';

test('BlazeDemo Flight Booking Flow - Select Lowest Price Flight', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await page.locator('select[name="fromPort"]').selectOption('Boston');
  await page.locator('select[name="toPort"]').selectOption('London');
  await page.locator('input[type="submit"]').click();

  
  const rows = page.locator('table.table tbody tr');
  const rowCount = await rows.count();
  console.log('Number of flight rows: ',rowCount);
  expect(rowCount).toBeGreaterThan(0); 

  
  const prices: string[] = [];
  for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText(); 
    prices.push(price);
  }

 
  console.log('Flight Prices:', prices);
  const sortedPrices = [...prices].sort(); 
  const lowestPrice = sortedPrices[0];
  console.log('Lowest Price:', lowestPrice);
  expect(lowestPrice).toBeDefined(); 

  
  for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText();
    if (price === lowestPrice) {
      await rows.nth(i).locator('td input[type="submit"]').click();
      break;
    }
  }

  
  await page.locator('#inputName').fill('John');
  await page.locator('#address').fill('1403 American Beauty Ln');
  await page.locator('#city').fill('Columbus');
  await page.locator('#state').fill('OH');
  await page.locator('#zipCode').fill('43240');
  await page.locator("#cardType").selectOption("American Express")
  await page.locator('#creditCardNumber').fill('6789067345231267');
  await page.locator('#creditCardMonth').fill('10');  
  await page.locator('#creditCardYear').fill('2024'); 
  await page.locator('#nameOnCard').fill('John Canedy');

  
  await page.locator('input[value="Purchase Flight"]').click();

  
  const confirmationText = await page.locator('h1').textContent();
  console.log('Confirmation Message:', confirmationText);
  expect(confirmationText).toContain('Thank you for your purchase');

  await page.waitForTimeout(3000);
});
