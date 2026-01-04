import {test, expect} from '@playwright/test';
import fs from 'fs';

function readJson(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

test('Patch Booking - PATCH request', async ({request}) => {
    const requestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody}); // Create a booking to update
    expect(createResponse.ok()).toBeTruthy();

    const responseBody = await createResponse.json();
    const bookingId = responseBody.bookingid;
    console.log(`Booking ID: ${bookingId}`);

    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {data: tokenRequestBody}); // Get auth token
    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log(`Auth Token: ${token}`);


    const patchRequestBody = readJson('testdata/patch_request_body.json');
    const patchResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: patchRequestBody,
        headers: {
            'Cookie': `token=${token}`
        }
    });
    expect(patchResponse.ok()).toBeTruthy();
    expect(patchResponse.status()).toBe(200);

    const partialUpdatedResponseBody = await patchResponse.json();
    console.log(partialUpdatedResponseBody);
    console.log("Booking details updated successfully!");
});
