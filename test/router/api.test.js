const request = require("supertest");

const app = require("../../src/app");

const apiVersion = "v1";

describe(`Api ${apiVersion} - Get Routes`, () => {
    const endpoints = [
        "item",
        "user",
        "sell",
    ];
    test.each(endpoints)(`GET /%s`, (endpoint) => {
        return request(app)
            .get(`/api/${apiVersion}/${endpoint}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                return expect(Array.isArray(response.body)).toBe(true);
            })
    })
});