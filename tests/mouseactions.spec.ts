import {test, expect} from '@playwright/test';

test('Mouse hove' , async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const pointMe = page.locator('.dropbtn');
  await pointMe.hover();

  const laptops = page.locator('.dropdown-content a:nth-child(2)');
  await laptops.hover();
  await page.waitForTimeout(3000);

});

test('Right click' , async ({page}) => {
  await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
  const button = page.locator('span.context-menu-one');
  await button.click({button: 'right'});  // this will perform right click action

  await page.waitForTimeout(3000);



});

test('Double click' , async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const btnCopy = page.locator("button[ondblclick='myFunction1()']");
  await btnCopy.dblclick();  // performs the double click action
  const field2 = page.locator("#field2");
  await expect(field2).toHaveValue('Hello World!');
  await page.waitForTimeout(3000);



});

test('Drag and Drop' , async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const sourceElement = page.locator("#draggable");
  const targetElement = page.locator("#droppable");

  // Approach 1: Using mouse hover and drag manually
//   await sourceElement.hover();
//   const sourceBox = await sourceElement.boundingBox();
//   const targetBox = await targetElement.boundingBox();
//     if (sourceBox && targetBox) {
//         await page.mouse.move(
//             sourceBox.x + sourceBox.width / 2,
//             sourceBox.y + sourceBox.height / 2
//         );
//         await page.mouse.down();
//         await page.mouse.move(
//             targetBox.x + targetBox.width / 2,
//             targetBox.y + targetBox.height / 2
//         );
//         await page.mouse.up();
//     }

    // Approach 2: Using built-in drag and drop method
  await sourceElement.dragTo(targetElement);  //this will perform drag and drop action
  await page.waitForTimeout(3000);
});