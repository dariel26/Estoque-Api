const mongoose = require("../db");

const sellSchema = new mongoose.Schema({
    items: { type: Array, validate: array => array.length > 0 },
    sellAt: { type: Date, default: new Date() },
    emailUser: { type: String, required: true },
});

const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;