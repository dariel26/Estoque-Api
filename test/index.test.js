
require("dotenv").config();

describe("Environment Variables", () => {
    test("DB Url", () => {
        return expect(process.env.URL_DB).toBeDefined();
    });
    test("Running Port", () => {
        return expect(process.env.PORT).toBeDefined();
    });
});