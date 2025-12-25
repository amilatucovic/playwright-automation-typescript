import {test, expect} from "@playwright/test";
import fs from 'fs';
test('Download text file', async ({page}) => {
 await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
 await page.locator('#inputText').fill("welcome");
 await page.locator("#generateTxt").click();
 const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#txtDownloadLink').click()]);

 const downloadPath = 'downloads/testfile.txt';
 await download.saveAs(downloadPath);

 const fileExists = fs.existsSync(downloadPath);  //returns true if fle exists
 expect(fileExists).toBeTruthy();

 if(fileExists) {
    fs.unlinkSync(downloadPath);
 }

 await page.waitForTimeout(5000);

});

test('Download PDF file', async ({page}) => {
 await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
 await page.locator('#inputText').fill("welcome");
 await page.locator('#generatePdf').click();
 const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#pdfDownloadLink').click()]);
 // We should avoid await inside Promise.all method because we neeed to execute 
 // both methods paralelly, 
 // we dont need to wait for one method to finish execution to start another.
 const downloadPath = 'downloads/testfile.pdf';
 await download.saveAs(downloadPath);

 const fileExists = fs.existsSync(downloadPath);  //returns true if fle exists
 expect(fileExists).toBeTruthy();

 if(fileExists) {
    fs.unlinkSync(downloadPath);
 }

 await page.waitForTimeout(5000);

});