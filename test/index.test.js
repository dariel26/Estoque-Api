
require("dotenv").config();

describe("index.js", () => {
    test("Environment Variables", () => {
        return expect(process.env.URL_DB).toBeDefined();
    })
});