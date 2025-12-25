import {test, expect} from "@playwright/test"
test('Keyboard actions', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const input1 = page.locator('#input1');
  await input1.focus();
  input1.click();
  await page.keyboard.insertText("welcome");

  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');

  await page.keyboard.down('Control');
  await page.keyboard.press('C');
  await page.keyboard.up('Control');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

   await page.keyboard.down('Control');
  await page.keyboard.press('V');
  await page.keyboard.up('Control');

  await page.waitForTimeout(5000);
});

test('Keyboard actions - simple way', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const input1 = page.locator('#input1');
  await input1.focus();
  input1.click();
  await page.keyboard.insertText("welcome");

  await page.keyboard.press('Control+A');  // Press is combination of down and up
  await page.keyboard.press('Control+C');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Control+V');

  await page.waitForTimeout(5000);
});