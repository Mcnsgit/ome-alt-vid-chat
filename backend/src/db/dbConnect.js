const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
    process.exit(1); // Exit if we can't connect to the database
  }
}

module.exports = dbConnect;
