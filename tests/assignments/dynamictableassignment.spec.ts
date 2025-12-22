import {test, expect, Locator} from "@playwright/test"
test("Verify Chrome CPU Load in dynamic table", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  const rows: Locator[] = await table.locator("tr").all();
  console.log("Number of rows in a table: ", rows.length);
  expect(rows).toHaveLength(4);

  let cpuLoad = '';
   for(const row of rows) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if(processName === "Chrome") {
         cpuLoad=await row.locator("td", {hasText: '%'}).innerText();  
         console.log("CPU Load of Chrome: ", cpuLoad);
         break;
    }
  }
  let redBoxText: string = await page.locator(".chrome-cpu").innerText();
  console.log("Chrome CPU load from yellow box: ", redBoxText);

  if(redBoxText.includes(cpuLoad)) {
    console.log("CPU Load of Chrome is equal.");
  }
  else {
    console.log("CPU Load of Chrome is not equal.");
  }
  expect(redBoxText).toContain(cpuLoad);
  await page.waitForTimeout(5000);
});

test("Verify Firefox Memory Usage in dynamic table", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  const rows: Locator[] = await table.locator("tr").all();
  console.log("Number of rows in a table: ", rows.length);
  expect(rows).toHaveLength(4);

  let memoryUsage = '';
   for(const row of rows) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if(processName === "Firefox") {
         memoryUsage=await row.locator("td", {hasText: /^\d+(\.\d+)? MB$/}).innerText();  
         console.log("Memory Usage of Firefox: ", memoryUsage);
         break;
    }
  }
  let blueBoxText: string = await page.locator(".firefox-memory").innerText();
  console.log("Memory usage from blue box: ", blueBoxText);

  if(blueBoxText.includes(memoryUsage)) {
    console.log("Memory usage of Firefox is equal.");
  }
  else {
    console.log("Memory usage of Firefox is not equal.");
  }
  expect(blueBoxText).toContain(memoryUsage);
  await page.waitForTimeout(5000);
});

test("Verify Network speed of Chrome in dynamic table", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  const rows: Locator[] = await table.locator("tr").all();
  console.log("Number of rows in a table: ", rows.length);
  expect(rows).toHaveLength(4);

  let networkSpeed = '';
   for(const row of rows) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if(processName === "Chrome") {
         networkSpeed=await row.locator("td", {hasText: 'Mbps'}).innerText();  
         console.log("Network speed of Chrome: ", networkSpeed);
         break;
    }
  }
  let yellowBoxText: string = await page.locator(".chrome-network").innerText();
  console.log("Chrome Network speed from yellow box: ", yellowBoxText);

  if(yellowBoxText.includes(networkSpeed)) {
    console.log("Network speed of Chrome is equal.");
  }
  else {
    console.log("Network speed of Chrome is not equal.");
  }
  expect(yellowBoxText).toContain(networkSpeed);
  await page.waitForTimeout(5000);
});

test("Verify Disk space of Firefox in dynamic table", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table: Locator = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  const rows: Locator[] = await table.locator("tr").all();
  console.log("Number of rows in a table: ", rows.length);
  expect(rows).toHaveLength(4);

  let diskSpace = '';
   for(const row of rows) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if(processName === "Firefox") {
         diskSpace=await row.locator("td", {hasText: 'MB/s'}).innerText();  
         console.log("Disk space of Firefox: ", diskSpace);
         break;
    }
  }
  let violetBoxText: string = await page.locator(".firefox-disk").innerText();
  console.log("Disk space of Firefox process: ", violetBoxText);

  if(violetBoxText.includes(diskSpace)) {
    console.log("Disk space of Firefox is equal.");
  }
  else {
    console.log("Disk space of Firefox is not equal.");
  }
  expect(violetBoxText).toContain(diskSpace);
  await page.waitForTimeout(5000);
});
