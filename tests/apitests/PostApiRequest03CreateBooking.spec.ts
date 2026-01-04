// Create booking
// Request Type: POST
// Request Body: random / dynamic data (faker library can be used)
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {DateTime} from 'luxon';
test("Create POST request using randomly generated data", async ({ request }) => {
   

    // Generate random data using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 5000 });
    const depositPaid = faker.datatype.boolean();
    const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkoutDate = DateTime.now().plus({ days: faker.number.int({ min: 1, max: 10 }) }).toFormat('yyyy-MM-dd');
    const additionalNeeds = faker.lorem.words(2);



    const requestBody = {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": depositPaid,
        "bookingdates": {
            "checkin": checkinDate,
            "checkout": checkoutDate
        },
        "additionalneeds": additionalNeeds
    };


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