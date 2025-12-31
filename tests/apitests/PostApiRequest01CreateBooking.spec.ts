// Create booking
// Request Type: POST
// Request Body: static
import { test, expect } from '@playwright/test';
test("Create POST request using static body", async ({ request }) => {
    const requestBody = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 1000,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2025-07-01",
            "checkout": "2025-07-05"
        },
        "additionalneeds": "Breakfast"
    };


    const response = await request.post('/booking', {
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
       "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 1000,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    });
    expect(booking.bookingdates).toMatchObject({
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    });

});