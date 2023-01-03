const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../src/app");
const { createToken } = require("../../src/services/access");

const accessVersion = "v1";
const apiVersion = "v1";

const idUser = mongoose.Types.ObjectId(4);
const email = "teste2@teste.tes";
const password = "1234";
const similarPass = "123";
const userParams = { _id: idUser, name: "teste2", email: email, password: password, active: true, link: "https://google.com" };
const token = createToken({ id: "1" });

describe(`Api ${apiVersion} - User`, () => {
    return test('add user', () => {
        return request(app)
            .post(`/api/${apiVersion}/user`)
            .send(userParams)
            .expect(200)
            .expect('Content-Type', /json/)
    })
});

describe(`Access ${accessVersion} - Login`, () => {
    test("login - 200", () => {
        return request(app)
            .post(`/access/${accessVersion}/login`)
            .send({ login: email, password })
            .expect(200)
            .expect('Content-Type', /json/)
    });
});

describe(`Api ${apiVersion} - User`, () => {
    return test('delete user', () => {
        return request(app)
            .delete(`/api/${apiVersion}/user?token=${token}&id=${idUser}`)
            .expect(200)
            .expect('Content-Type', /json/)
    })
});

describe(`Access ${accessVersion} - Logout`, () => {
    test("logout - 200", () => {
        return request(app)
            .post(`/access/${accessVersion}/logout?token=${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
    })
});

describe(`Access ${accessVersion} - Login Non-existent User`, () => {
    test("login - 404", () => {
        return request(app)
            .post(`/access/${accessVersion}/login`)
            .send({ login: email, password })
            .expect(404)
            .expect('Content-Type', /json/)
    });
});

describe(`Access ${accessVersion} - Login Invalid Password`, () => {
    test("login - 404", () => {
        return request(app)
            .post(`/access/${accessVersion}/login`)
            .send({ login: email, similarPass })
            .expect(400)
            .expect('Content-Type', /json/)
    });
});

describe(`Access ${accessVersion} - Logout Invalid Token`, () => {
    test("logout - 401", () => {
        return request(app)
            .post(`/access/${accessVersion}/logout?token=${token}`)
            .expect(401)
            .expect('Content-Type', /json/)
    })
});

describe(`Access ${accessVersion} - Logout Non-existent Token`, () => {
    test("logout - 400", () => {
        return request(app)
            .post(`/access/${accessVersion}/logout`)
            .expect(400)
            .expect('Content-Type', /json/)
    })
});