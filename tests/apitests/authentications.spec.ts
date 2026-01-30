import { test, expect } from '@playwright/test';

// No Auth

test('Public API - No Authentication Required', async ({ request }) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    console.log(responseData);

});

// Basic Auth

test('Basic Authentication', async ({ request }) => {
    const response = await request.get("https://httpbin.org/basic-auth/user/pass", {
        headers: { 'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64') }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

// Token Auth
// test('Token Authentication', async ({ request }) => {
//     const bearerToken = "YOUR_BEARER_TOKEN_HERE";
//     const response = await request.get("https://api.github.com/user/repos", {
//         headers: { 'Authorization': 'Bearer ' + bearerToken }
//     });
//     expect(response.ok()).toBeTruthy();
//     expect(response.status()).toBe(200);
//     console.log(await response.json());
// });

// test('Token Authentication - User Info', async ({ request }) => {
//     const bearerToken = "YOUR_BEARER_TOKEN_HERE";
//     const response = await request.get("https://api.github.com/user", {
//         headers: { 'Authorization': 'Bearer ' + bearerToken }
//     });
//     expect(response.ok()).toBeTruthy();
//     expect(response.status()).toBe(200);
//     console.log(await response.json());
// });

// API Key Authentication

// test('API Key Authentication 1', async ({ request }) => {
//     const apiKey = "YOUR_API_KEY_HERE"; 

//     const response = await request.get(
//         "https://api.openweathermap.org/data/2.5/weather",
//         {
//             params: {
//                 q: 'Mostar',
//                 appid: apiKey
//             }
//         }
//     );

//     expect(response.status()).toBe(200);
//     console.log(await response.json());
// });
