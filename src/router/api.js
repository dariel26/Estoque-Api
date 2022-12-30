const express = require("express");
const { getItem, putItem, deleteItem, addItem } = require("../controllers/itemController");
const { deleteSell, addSell, putSell, getSell } = require("../controllers/sellController");
const { addUser, getUser, putUser, deleteUser } = require("../controllers/userController");
const api = express.Router();

//User Routes
api.get("/v1/user", getUser);
api.put("/v1/user", putUser);
api.delete("/v1/user", deleteUser);
api.post("/v1/user", addUser);

//Items Routes
api.get("/v1/item", getItem);
api.put("/v1/item", putItem);
api.delete("/v1/item", deleteItem);
api.post("/v1/item", addItem);

//Items Routes
api.get("/v1/sell", getSell);
api.put("/v1/sell", putSell);
api.delete("/v1/sell", deleteSell);
api.post("/v1/sell", addSell);

module.exports = api;