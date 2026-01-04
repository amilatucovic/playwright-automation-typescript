import {test, expect} from '@playwright/test';
import fs from 'fs';

function readJson(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

test('Update Booking - PUT request', async ({request}) => {
    const requestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('/booking', {data:requestBody}); // Create a booking to update
    expect(createResponse.ok()).toBeTruthy();

    const responseBody = await createResponse.json();
    const bookingId = responseBody.bookingid;
    console.log(`Booking ID: ${bookingId}`);

    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('/auth', {data: tokenRequestBody}); // Get auth token
    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log(`Auth Token: ${token}`);


    const putRequestBody = readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingId}`, {
        data: putRequestBody,
        headers: {
            'Cookie': `token=${token}`
        }
    });
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updatedResponseBody = await updateResponse.json();
    console.log(updatedResponseBody);
    console.log("Booking details updated successfully!");
});
