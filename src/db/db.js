require("dotenv").config();
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URL_DB);
}

module.exports = mongoose;