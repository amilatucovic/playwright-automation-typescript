import {test, expect, Locator} from "@playwright/test"

test("Autosuggest dropdown", async({page}) => {
    await page.goto("https://www.flipkart.com/");
    await page.locator("input[name='q']").fill("smart");
    await page.waitForTimeout(5000);
    //Ctrl Shift P - kliknuti Emulate focused page --get all suggested  options
    // Kada zavrsimo kliknemo Do not emulate focused page
    const options:Locator=page.locator("ul>li");
    const count=await options.count();
    console.log("Number of suggested options: ", count);
    console.log("Printing all the auto suggestions...");
    for(let i=0; i<count; i++) {
       console.log(await options.nth(i).innerText());  //moze i textcontent umjesto innerText
    }

    for(let i=0; i<count; i++) {
       const text = await options.nth(i).innerText(); 
       if(text==='smartphone') {
        options.nth(i).click();
        break;
       }
    }

    await page.waitForTimeout(3000);

});