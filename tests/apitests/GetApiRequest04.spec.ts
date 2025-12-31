import { test, expect } from "@playwright/test"

test('Get booking details by ID - path parameter', async ({ request }) => {
    const bookingId = 1; // We can pass this as path parameter
    const response = await request.get(`/booking/${bookingId}`);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
    expect(responseBody).toHaveProperty('depositpaid');
    expect(responseBody).toHaveProperty('bookingdates');
    expect(responseBody.bookingdates).toHaveProperty('checkin');
    expect(responseBody.bookingdates).toHaveProperty('checkout');
});

test('Get booking details by Name - query parameter', async ({ request }) => {

    const firstName = "Jim";
    const lastName = "Jackson";
    
    // const response = await request.get(`/booking?firstname=${firstName}&lastname=${lastName}`);
    const response = await request.get('/booking', {
        params: {
            firstname: firstName,
            lastname: lastName
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
   // expect(responseBody.length).toBeGreaterThan(0);

    for (const item of responseBody) {
        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe('number');
        expect(item.bookingid).toBeGreaterThan(0);
    }
});