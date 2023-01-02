const express = require("express");
const { verifyToken } = require("../middlewares/jwt");
const { login, logout } = require("../services/access");

const router = express.Router();

router.post("/v1/login", login);
router.post("/v1/logout", verifyToken, logout);

module.exports = router;