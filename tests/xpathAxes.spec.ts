import {test, expect, Locator} from "@playwright/test"
test("XPath Axes demo", async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    // self
    const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText('Germany');
    
    //parent
    const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
    // await expect(parentRow).toContainText("Maria Anders");
    await expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany");
    console.log(await parentRow.textContent());

    //child axis
    const secondRowCells: Locator = page.locator("//table[@id='customers']//tr[2]/child::td"); //returns multiple tds
    await expect(secondRowCells).toHaveCount(3);

    //ancestor axis
    const table: Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id', 'customers');

    //descendant axis
    const allTds: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allTds).toHaveCount(18);

    //following axis
    const followingCell: Locator = page.locator("//td[normalize-space()='Germany']/following::td[1]");
    await expect(followingCell).toHaveText("Centro comercial Moctezuma");

    const rightSiblings: Locator = page.locator("//td[normalize-space()='Germany']/following-sibling::td");
    await expect(rightSiblings).toHaveCount(0);

    //preceding axis
    const precedingCell: Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingCell).toHaveText("Maria Anders");

    //preceding siblings
    const leftSiblings: Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(leftSiblings).toHaveCount(2);
    await expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste");
    await expect(leftSiblings.nth(1)).toHaveText("Maria Anders");
});