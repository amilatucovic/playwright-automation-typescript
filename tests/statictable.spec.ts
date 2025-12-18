import {test, expect, Locator} from "@playwright/test"
test("Static web table", async ({page})=> {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("table[name='BookTable'] tbody");
  await expect(table).toBeVisible();

  //count rows in a table
  const rows:Locator = table.locator("tr");
  await expect(rows).toHaveCount(7);  //approach 1
  const rowCount: number = await rows.count();
  console.log("Number of rows in a table: ", rowCount);
  expect(rowCount).toBe(7); //approach 2

  // count number of columns/headers
  const columns: Locator =  rows.locator("th");
  await expect(columns).toHaveCount(4);  // approach 1

  const columnCount:number = await columns.count();
  console.log("Number of columns/headers: ", columnCount);
  expect(columnCount).toBe(4);  //approach 2

  // Read all data from second row
  const secondRowCells:Locator = rows.nth(2).locator('td');
  const secondRowTexts:string[] = await secondRowCells.allInnerTexts();
  console.log("Second Row data: ",secondRowTexts);
  
  await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

  console.log("Printing 2nd row data....");
  for(let txt of secondRowTexts) {
    console.log(txt);
  };

  // Read all the data from the table excluding header
  const allRowsData = await rows.all();
  console.log("BookName   Author    Subject    Price");
  for(let row of allRowsData.slice(1)) {  //slice(1) --> skip header row
    const cols = await row.locator('td').allInnerTexts();
    console.log(cols.join('\t'));
  }

  // Print booknames where author is Mukesh
  console.log("--Books written by Mukesh--");
  const mukeshBooks: string[] = [];
  for (let row of allRowsData.slice(1)) {
    const cells = await row.locator('td').allInnerTexts();
    const author = cells[1];
    const book = cells[0];

    if(author === 'Mukesh') {
        console.log(`${author} \t ${book}`);
        mukeshBooks.push(book);
    }
  }

  expect(mukeshBooks).toHaveLength(2);

  // calculate the total price of books
let totalPrice:number = 0;
  for (let row of allRowsData.slice(1)) {
    const cells = await row.locator('td').allInnerTexts();
    const price = cells[3];
    totalPrice+=parseInt(price);
    
  }
  console.log("Total price: ", totalPrice);
  expect(totalPrice).toBe(7100);

}); 