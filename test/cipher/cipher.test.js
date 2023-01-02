const cipher = require("../../src/cipher/cipher")

const password = "123";
const similarPass = "1234";
let hashAux = undefined;

describe("Cipher", () => {
    test("encrypting password", async () => {
        hashAux = await cipher.cipher(password);
        expect(typeof hashAux === "string").toBe(true);
        expect(hashAux).toBeDefined();
        expect(hashAux === password).toBe(false);
    });

    test("comparing password with hash", () => {
        cipher.compare(password, hashAux).then((result) => {
            expect(result).toBe(true);
        })
        cipher.compare(similarPass, hashAux).then((result) => {
            expect(result).toBe(false);
        })
        cipher.compare(undefined, hashAux).then((result) => {
            expect(result).toBe(false);
        })
    })

    test("hashes created through that same password are different", () => {
        cipher.cipher(password).then((hash) => {
            return expect(hash === hashAux).toBe(false);
        })
    })

    test("invalid password return error", async () => {
        try {
            await cipher.cipher(undefined);
        } catch (error) {
            expect(error).toBeDefined();
        }
        try {
            await cipher.cipher([]);
        } catch (error) {
            expect(error).toBeDefined();
        }
        try {
            await cipher.cipher({});
        } catch (error) {
            expect(error).toBeDefined();
        }
        try {
            await cipher.cipher(123);
        } catch (error) {
            expect(error).toBeDefined();
        }
        try {
            await cipher.cipher('');
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
})