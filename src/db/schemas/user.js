const mongoose = require("../db");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: Array, default: ["USER"] },
    active: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;