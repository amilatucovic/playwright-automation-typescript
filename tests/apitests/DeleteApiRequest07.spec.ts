import {test, expect} from '@playwright/test';
import fs from 'fs';    

function readJson(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

test('Delete Booking (End-to-End) - DELETE request', async ({request}) => {
    const postRequestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {data:postRequestBody});
    expect(createResponse.ok()).toBeTruthy();
    console.log("Booking is created successfully.");


    const postResponseBody = await createResponse.json();
    const bookingId = postResponseBody.bookingid;
    console.log(`Booking ID to be deleted: ${bookingId}`);

    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`); // Verify booking exists before deletion
    const getResponseBody = await getResponse.json();
    console.log("Booking details are:");
    console.log(getResponseBody);

    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {data: tokenRequestBody});
    expect(tokenResponse.ok()).toBeTruthy();    

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log(`Auth Token: ${token}`);

    const putRequestBody = readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: putRequestBody,
        headers: {
            'Cookie': `token=${token}`
        }
    });

    const updatedResponseBody = await updateResponse.json();
    console.log("Booking details updated successfully!");
    console.log(updatedResponseBody);

    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${token}`
        }
    });
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);
    console.log(`Booking ID ${bookingId} deleted successfully!`);

    const getDeletedResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    expect(getDeletedResponse.status()).toBe(404);
    console.log(`Verified that Booking ID ${bookingId} no longer exists.`);
});