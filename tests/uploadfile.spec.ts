import {test, expect} from '@playwright/test'
test('Single file upload', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#singleFileInput').setInputFiles('uploads/ClassNotes.txt');
  await page.locator("button:has-text('Upload Single File')").click();

  const msg = await page.locator('#singleFileStatus').textContent();
  expect(msg).toContain('ClassNotes.txt');
  console.log("Upload successfull...");

  await page.waitForTimeout(5000);
});

test('Multiple files upload', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#multipleFilesInput').setInputFiles(['uploads/resume.pdf', 'uploads/pdf-sample (2).pdf']);
  await page.locator("button:has-text('Upload Multiple Files')").click();
  const msg = await page.locator('#multipleFilesStatus').textContent();
  expect(msg).toContain("resume.pdf");
  expect(msg).toContain("pdf-sample (2).pdf");
  console.log("Files uploaded...");
  console.log(msg);
  await page.waitForTimeout(5000);
});