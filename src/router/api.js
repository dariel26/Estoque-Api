const express = require("express");
const { getItem, putItem, deleteItem, addItem } = require("../controllers/itemController");
const { deleteSell, addSell, putSell, getSell } = require("../controllers/sellController");
const { addUser, getUser, putUser, deleteUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwt");
const api = express.Router();

//User Routes
api.get("/v1/user", verifyToken, getUser);
api.put("/v1/user", verifyToken, putUser);
api.delete("/v1/user", verifyToken, deleteUser);
api.post("/v1/user", addUser);

//Items Routes
api.get("/v1/item", verifyToken, getItem);
api.put("/v1/item", verifyToken, putItem);
api.delete("/v1/item", verifyToken, deleteItem);
api.post("/v1/item", verifyToken, addItem);

//Items Routes
api.get("/v1/sell", verifyToken, getSell);
api.put("/v1/sell", verifyToken, putSell);
api.delete("/v1/sell", verifyToken, deleteSell);
api.post("/v1/sell", verifyToken, addSell);

module.exports = api;