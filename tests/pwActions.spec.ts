import {test, expect, Locator} from "@playwright/test"

// Text Input / Text Box / Input Box
test('Text Input Actions', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const textBox: Locator = page.locator("#name");
  await expect(textBox).toBeVisible();
  await expect(textBox).toBeEnabled();
  const maxLength: string | null = await textBox.getAttribute("maxlength");
  expect(maxLength).toBe('15');

  await textBox.fill("Amila Tucovic");
  // console.log("Text content of Name textbox: ",await textBox.textContent());  - returns empty
  const enteredValue: string = await textBox.inputValue();   //returns input value of textbox
  console.log("Input value of the First Name: ", enteredValue); 
  expect(enteredValue).toBe("Amila Tucovic");
  await page.waitForTimeout(3000);
});


// Radio Buttons
test('Radio Button Actions', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const maleRadio: Locator = page.locator('#male'); // Male radio button
  
  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();
  expect(await maleRadio.isChecked()).toBe(false);  //value T or F
  
  await maleRadio.check();  //select radio button
  expect(await maleRadio.isChecked()).toBe(true);
  await expect(maleRadio).toBeChecked();  //alternativa za ovo iznad - ovo je preferable


  await page.waitForTimeout(3000);
});


// Checkbox
test.only('Checkbox Actions', async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  const sundayCheckbox: Locator = page.getByLabel('Sunday');
 // await sundayCheckbox.check();
  // await expect(sundayCheckbox).toBeChecked();

  // Select all checkboxes and assert each is checked

  const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const checkboxes: Locator[]=days.map(index => page.getByLabel(index));
  expect(checkboxes.length).toBe(7);

  // Select all checkboxes

//    for(const checkbox of checkboxes) 
//    {
//      await checkbox.check();
//      await expect(checkbox).toBeChecked();
//    }

   //await page.waitForTimeout(3000);

   // Uncheck last 3 checkboxes and assert
//    for(const checkbox of checkboxes.slice(-3)) 
//     {
//       await checkbox.uncheck();
//       await expect(checkbox).not.toBeChecked(); //on every assertion we can use not operator
//     }

//     await page.waitForTimeout(3000);

    // Toggle checkboxes, if checked - uncheck and vice versa
//    for (const checkbox of checkboxes) 
//    {
//      if(await checkbox.isChecked()) {
//         await checkbox.uncheck();
//         await expect(checkbox).not.toBeChecked();
//      }
//      else {
//         await checkbox.check();
//         await expect(checkbox).toBeChecked();
//      }
    
//    }
  
    // await page.waitForTimeout(3000);

    // Randomly select checkboxes - by index (1, 3, 6)
    // const indexes: number[] = [1,3,6];
    // for(const i of indexes) {
    //   await checkboxes[i].check();
    //   await expect(checkboxes[i]).toBeChecked();
    // }
    
    // await page.waitForTimeout(3000);

    // Select the checkbox based on the label

    const weekName: string = "Friday";
    for(const label of days) {

       if(label.toLowerCase()===weekName.toLowerCase()) {
         const checkbox = page.getByLabel(label);
         checkbox.check();
         await expect(checkbox).toBeChecked();
       }
    }
    await page.waitForTimeout(3000);
});