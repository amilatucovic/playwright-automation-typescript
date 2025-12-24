import {test, expect} from '@playwright/test';  
test("Infinite scrolling" , async ({page}) => {
    test.slow();  
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
    let previousHeight = 0;
    while (true) {

        //Scroll down the page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(2000); 

        const currentHeight = await page.evaluate(() => {  //To run JS code in Playwright we need to use evaluate method, and inside the arrow function we can write the JS code.
            return document.body.scrollHeight;  // returns the current height of the webpage
        });
        console.log("Previous Height: ", previousHeight);
        console.log("Current Height: ", currentHeight);
        if(currentHeight === previousHeight) {
        break;  // exit the loop if no new content is loaded
       }
        previousHeight = currentHeight;
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(3000);  // wait for new content to load
    };
    console.log("Reached the end of the page...");

});