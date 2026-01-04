// Create booking
// Request Type: POST
// Request Body: JSON file
import { test, expect } from '@playwright/test';
import fs from 'fs';
test("Create POST request using JSON file", async ({ request }) => {
   
    const jsonFile = "testdata/post_request_body.json";
    const data = fs.readFileSync(jsonFile, 'utf-8');
    const requestBody = JSON.parse(data);

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: requestBody
    });
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    

    const booking = responseBody.booking;
    expect(booking).toMatchObject({
       "firstname": requestBody.firstname,
        "lastname": requestBody.lastname,
        "totalprice": requestBody.totalprice,
        "depositpaid": requestBody.depositpaid,
        "additionalneeds": requestBody.additionalneeds
    });
    expect(booking.bookingdates).toMatchObject({
        "checkin": requestBody.bookingdates.checkin,
        "checkout": requestBody.bookingdates.checkout
    });

});