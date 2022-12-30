const mongoose = require("../db");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: Array, default: ["USER"] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;