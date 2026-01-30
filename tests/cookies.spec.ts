import {test, expect, chromium} from "@playwright/test"   

// Cookies are small pieces of data stored by the browser that help websites remember information about the user. We can handle cookies using context.
// The browsing history will be saved inside the cookies. Cookies are used for session management, personalization, and tracking user behavior.

test("Cookies management", async () => {
  const browser = await chromium.launch();  
  const context = await browser.newContext();
  const page = await context.newPage();
  context.addCookies(
    [ {name: 'mycookie', value: '123456', url:'https://testautomationpractice.blogspot.com/'} ]

    );
    console.log("Cookie added...");
  await page.goto("https://testautomationpractice.blogspot.com/");
  const allTheCookiesAdded = await context.cookies();
  const retrievedCookie = allTheCookiesAdded.find((c) => c.name == 'mycookie');
  console.log("Printing cookie details: ", retrievedCookie);
  expect(retrievedCookie?.value).toBe('123456');
  expect(retrievedCookie).toBeDefined();

  // Get all the cookies
  console.log("Total number of cookies:", allTheCookiesAdded.length);  // 2
  expect(allTheCookiesAdded.length).toBeGreaterThan(0);
  console.log("Printing all the cookies:");
  for(const cookie of allTheCookiesAdded) {
    console.log(`${cookie.name} : ${cookie.value}`);
  }

  // Clear all the cookies from browser
  await context.clearCookies();
  const cookiesAfterClearing = await context.cookies();
  console.log("Number of cookies after clearing: ", cookiesAfterClearing.length);
  expect(cookiesAfterClearing.length).toBe(0);

  await page.waitForTimeout(3000);
});
