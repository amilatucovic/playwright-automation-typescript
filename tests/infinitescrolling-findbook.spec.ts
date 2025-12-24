import {test, expect} from '@playwright/test';  
test("Infinite scrolling" , async ({page}) => {
    test.slow();  
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
    let previousHeight = 0;
    let bookFound = false;
    while (true) {

        const titles = await page.locator('#productsDiv h3').allTextContents();
        if(titles.includes("Saint Death")) {
            console.log("Book 'Saint Death' found on the page.");
            bookFound = true;
            expect(bookFound).toBeTruthy();
            break;
        };
        //Scroll down the page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(2000); 

        const currentHeight = await page.evaluate(() => {  
            return document.body.scrollHeight;  
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
    if(!bookFound) {
        console.log("Book 'Saint Death' not found on the page.");
    }

});