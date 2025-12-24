import {test, expect, Locator} from "@playwright/test"
import { exec } from "node:child_process";
test("Frames Demo", async ({page}) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const frames = page.frames();
  console.log("Number of frames: ",frames.length);
  // Approach 1
//   const frame = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1.html"});
//   if(frame) {
//     // frame.locator("[name='mytext1']").fill("Hello");
//     await frame.fill("[name='mytext1']", "Hello");  //isto sto i ovo iznad
//   }
//   else {
//     console.log("Frame is not available");
//   }
//   await page.waitForTimeout(5000);

  // Approach 2
  
  const inputBox = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
  await inputBox.fill("John");
  await page.waitForTimeout(5000);
});

//

test("Inner/Child Frames Demo", async ({page}) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const frame3 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'});
  if(frame3) {
    await frame3?.locator("[name='mytext3']").fill("Welcome");
    const childFrames = frame3.childFrames();
    console.log("Child frames inside the Frame 3: ", childFrames.length);
    const radio = childFrames[0].getByLabel("I am a human");
    await radio.click(); // select radio button
    await expect(radio).toHaveAttribute('aria-checked', 'true');
  }
  else{
    console.log("Frame 3 is not found...");
  }
  await page.waitForTimeout(5000);
  
})