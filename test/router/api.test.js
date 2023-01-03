const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../src/app");
const { createToken } = require("../../src/services/access");

const apiVersion = "v1";
const endpoints = ["item", "user", "sell"];

const idItem = mongoose.Types.ObjectId(1);
const idUser = mongoose.Types.ObjectId(2);
const idSell = mongoose.Types.ObjectId(3);

const itemParams = { _id: idItem, name: "agua", code: "1", amount: 2, priceBuy: 2, priceSell: 4 };
const userParams = { _id: idUser, name: "teste", email: "teste@teste.tes", password: "123", link: "https://google.com" };
const sellParams = { _id: idSell, items: [{ code: "123", name: "agua", price: 3.2 }], emailUser: "123" };
const token = createToken({ id: "2" });

describe(`Api ${apiVersion} - Post Routes`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .post(`/api/${apiVersion}/${endpoint}?token=${token}`)
                .send(endpoint === "item" ? itemParams
                    : endpoint === "user" ? userParams
                        : endpoint === "sell" ? sellParams
                            : undefined)
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Post Routes Equal Params`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .post(`/api/${apiVersion}/${endpoint}?token=${token}`)
                .send(endpoint === "item" ? itemParams
                    : endpoint === "user" ? userParams
                        : endpoint === "sell" ? sellParams
                            : undefined)
                .expect(400)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Get Routes`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .get(`/api/${apiVersion}/${endpoint}?token=${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    return expect(Array.isArray(response.body)).toBe(true);
                })
        })
    })
});

describe(`Api ${apiVersion} - Get Routes By Id`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .get(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    return expect(typeof response.body === "object").toBe(true);
                })
        })
    })
});

describe(`Api ${apiVersion} - Put Routes`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .put(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .send(endpoint === "item" ? { name: "otherItemTest" }
                    : endpoint === "user" ? { name: "otherUserTest" }
                        : endpoint === "sell" ? { nameUser: "otherUserTest" }
                            : undefined)
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Delete Routes`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .delete(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Delete Routes Non-existent Id`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .delete(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .expect(404)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Get Routes Non-existent Id`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .get(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .expect(404)
                .expect('Content-Type', /json/)
        })
    })
});

describe(`Api ${apiVersion} - Put Routes Non-existent Id`, () => {
    endpoints.map((endpoint) => {
        return test(endpoint, () => {
            return request(app)
                .put(`/api/${apiVersion}/${endpoint}?token=${token}&id=${endpoint === "item" ? idItem
                    : endpoint === "user" ? idUser
                        : endpoint === "sell" ? idSell
                            : undefined
                    }`)
                .send(endpoint === "item" ? { name: "otherItemTest" }
                    : endpoint === "user" ? { name: "otherUserTest" }
                        : endpoint === "sell" ? { nameUser: "otherUserTest" }
                            : undefined)
                .expect(404)
                .expect('Content-Type', /json/)
        })
    })
});