import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test("Validate JSON Schema - I", async ({ request }) => {
    const response = await request.get("https://mocktarget.apigee.net/json");
    const responseBody = await response.json();
    console.log(responseBody);

    const schema =
    {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();

});

test("Validate JSON Schema - II", async ({ request }) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    const responseBody = await response.json();
    console.log(responseBody);

    const schema =
    {
        "type": "object",
        "properties": {
            "userId": {
                "type": "integer"
            },
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "body": {
                "type": "string"
            }
        },
        "required": [
            "userId",
            "id",
            "title",
            "body"
        ]
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();

});
