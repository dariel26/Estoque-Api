const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const api = require("./router/api");
const access = require("./router/access");

const app = express();

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

//Routas da Api
app.use("/api", api);

//Routas de acesso
app.use("/access", access);

module.exports = app;