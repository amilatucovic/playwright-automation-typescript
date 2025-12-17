/*
 2 types of CSS locators:
 1) Absolute CSS locator
 2) Relative CSS locator

tag with ID     tag#id  #id
tag with class  tag.class  .class
tag with any other attribute  tag[attribute=value]   [attribute=value]  
tag with class and attribute  tag.class[attribute=value]  .class[attribute=value]

page.locator(css/xpath)
*/

import {test, expect, Locator} from "@playwright/test"

test("Verify CSS locators", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

  //tag#id
  // const searchbox : Locator = page.locator("input#small-searchterms");
  // await searchbox.fill("T-Shirts");

  //await expect(page.locator("input#small-searchterms")).toBeVisible();
  //await page.locator("input#small-searchterms").fill("T-shirts");
  

  //tag.class
  //await page.locator("input.search-box-text").fill("T-Shirts")
  

  //tag[attribute=value]
  //await page.locator("input[name=q]").fill("T-Shirts");
  //await page.locator("[name='q']").fill("T-Shirts");
  

  //tag.class[attribute=value]
  await page.locator("input.search-box-text[value='Search store']").fill("T-Shirts");
  await page.waitForTimeout(3000);
});