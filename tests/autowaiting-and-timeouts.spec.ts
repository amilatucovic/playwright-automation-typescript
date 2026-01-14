import {test, expect} from '@playwright/test';

test('Autowaiting and forcing', async ({page}) => {
    test.setTimeout(60000); // Increase timeout for this test - 60 seconds

    //test.slow(); // This will triple the default timeout for this test - it will be 90 seconds instead of 30 seconds. This is rarely needed.
    await page.goto('https://demowebshop.tricentis.com/');

    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout: 10000}); // wait for welcome text to be visible - timeout for assertion

    await page.locator('#small-searchterms').fill('Laptop', {force: true});  // search box - force action (it will not do actionability checks)
    await page.locator('.button-1.search-box-button').click({force: true});  // clicking on search button - force action
});