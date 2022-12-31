
require("dotenv").config();

describe("index.js", () => {
    it("Variaiveis de ambiente", () => {
        return expect(process.env.URL_DB).toBeDefined();
    })
});