import {test, expect} from '@playwright/test';
/* Most of the time, Playwright will automatically scroll for you before doing any actions.
Therefore, you do not need to scroll explicitly.
*/
test('Scrolling to footer' , async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const footerText: string = await page.locator('.footer-disclaimer').innerText();
    console.log("Footer text captured: ", footerText);
    await page.waitForTimeout(3000);
});

test('Scrolling inside the dropdown' , async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#comboBox").click(); // click on the dropdown to expand it
    const option = page.locator('#dropdown div:nth-child(100)');
    console.log("Option text captured from the Dropdown: ", await option.innerText());
    await option.click();
    await page.waitForTimeout(3000);
});

test('Scrolling inside of a table' , async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/scroll_xy.html");
    const name = await page.locator('tbody tr:nth-child(10) td:nth-child(2)').innerText(); //Automatic scrolling - vertical
    console.log("Last Name from 10th Row & 2nd Column: ", name); //Kelly

    const email = await page.locator('tbody tr:nth-child(10) td:nth-child(9)').innerText(); //Automatic scrolling - horizontal
    console.log("Email from 10th Row & 9th Column: ", email);  //c.kelly@datatables.net
});

