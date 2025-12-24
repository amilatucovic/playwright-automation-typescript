import { test, expect } from '@playwright/test';

// Test for Frame 1
test('Frame 1: Fill and assert input field', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame1 = page.frameLocator('frame[src="frame_1.html"]');
  await frame1.locator('input[name="mytext1"]').fill('Welcome');
  await expect(frame1.locator('input[name="mytext1"]')).toHaveValue('Welcome');
});

// Test for Frame 2
test('Frame 2: Fill and assert input field', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame2 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_2.html' });
  if (frame2) {
    await frame2.locator('input[name="mytext2"]').fill('Suneel');
    await expect(frame2.locator('input[name="mytext2"]')).toHaveValue('Suneel');
  } else {
    console.error("Frame 2 not found.");
  }
});

// Test for Frame 3 with Nested Child Frame
test('Frame 3: Handle nested frame and form interactions', async ({ page }) => {
  test.setTimeout(60000);
  
  await page.goto('https://ui.vision/demo/webtest/frames/', { waitUntil: 'networkidle' });
  
  const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });

  if (frame3) {
    await frame3.locator('[name="mytext3"]').fill('You are in Frame 3 - Teal');
    await expect(frame3.locator('[name="mytext3"]')).toHaveValue('You are in Frame 3 - Teal');

    const childFrames = frame3.childFrames();
  
    await page.waitForTimeout(2000);
    const child = childFrames[0];

    
    const radioButton = child.getByRole('radio', { name: 'Hi, I am the UI.Vision IDE' });
    await radioButton.waitFor({ state: 'visible', timeout: 3000 });
    await radioButton.click();
   
    const checkbox = child.getByRole('checkbox', { name: 'Form Autofilling' });
    await checkbox.waitFor({ state: 'visible', timeout: 3000 });
    await checkbox.click();
 
    
    const dropdownTrigger = child.getByRole('option', { name: /Odaberi|Choose|Select/i });
    await dropdownTrigger.waitFor({ state: 'visible', timeout: 3000 });
    await dropdownTrigger.click();
    
   
    await page.waitForTimeout(3000); 
    
    const yesOption = child.getByRole('option', { name: 'Yes' });
    await yesOption.waitFor({ state: 'visible', timeout: 3000 }); 
    await yesOption.click();
    
    await page.waitForTimeout(2000);

    const nextButton = child.getByRole('button', { name: /Dalje|Next/i });
    await nextButton.waitFor({ state: 'visible', timeout: 3000 });
    await nextButton.click();

    const shortText = child.getByRole('textbox', { name: 'Enter a short text' });
    await shortText.waitFor({ state: 'visible', timeout: 3000 });
    await shortText.fill('We are here');
    await expect(shortText).toHaveValue('We are here');

    const longText = child.getByRole('textbox', { name: 'Enter a long answer' });
    await longText.waitFor({ state: 'visible', timeout: 3000 });
    await longText.fill('We are able to access all element in child frame');
    await expect(longText).toHaveValue('We are able to access all element in child frame');

    const submitButton = child.getByRole('button', { name: /Podnesi|Submit/i  });
    await submitButton.waitFor({ state: 'visible', timeout: 3000 });
    await submitButton.click();
    
    const confirmation = child.locator('.vHW8K');
    await confirmation.waitFor({ state: 'visible', timeout: 3000 });
    const confirmationText = await confirmation.innerText();
    expect(confirmationText).toContain('Thank you for testing the UI');
  } else {
    console.error("Frame 3 not found.");
  }
});

// Test for Frame 5
test('Frame 5: Fill input and verify logo after link click', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame5 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_5.html' });

  if (frame5) {
    await frame5.locator('input[name="mytext5"]').fill('playwright');
    await expect(frame5.locator('input[name="mytext5"]')).toHaveValue('playwright');
    await frame5.locator('a[href="https://a9t9.com"]').click();
    await page.waitForTimeout(5000); // Give time for content to load
    const logo = frame5.locator('img.responsive-img').first();
    await expect(logo).toBeVisible();
  } else {
    console.error("Frame 5 not found.");
  }
});