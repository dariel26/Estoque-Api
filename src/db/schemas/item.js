const mongoose = require("../db");

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    amount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image: { type: Buffer, default: undefined },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;