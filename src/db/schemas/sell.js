const mongoose = require("../db");

const sellSchema = new mongoose.Schema({
    namesItems: { type: Array, required: true },
    codesItems: { type: Array, required: true },
    sellAt: { type: Date, default: new Date() },
    nameUser: { type: String, required: true },
    emailUser: { type: String, required: true },
});

const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;