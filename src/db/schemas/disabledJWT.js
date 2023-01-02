const mongoose = require("../db");

const disabledJWTSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date(), expires: '24h' }
});

const DisabledJWT = mongoose.model('DisabledJWT', disabledJWTSchema);

module.exports = DisabledJWT;