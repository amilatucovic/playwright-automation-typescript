import {test, expect} from "@playwright/test"
test('Single file upload', async ({page}) => {
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator("#filesToUpload").setInputFiles("uploads/resume.pdf");

    const msg = await page.locator("ul[id='fileList'] li").textContent();
    expect(msg).toContain("resume.pdf");
    await page.waitForTimeout(5000);
});

test('Multiple files upload', async ({page}) => {
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator("#filesToUpload").setInputFiles(["uploads/resume.pdf", "uploads/ClassNotes.txt"]);

    const msg = await page.locator("ul[id='fileList']").textContent();
    expect(msg).toContain("resume.pdf");
    expect(msg).toContain("ClassNotes.txt");
    await page.waitForTimeout(5000);
});