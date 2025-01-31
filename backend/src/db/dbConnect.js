const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit if we can't connect to the database
  }
}

module.exports = dbConnect;
//drop whole database
//mongoose.connection.collections['users'].drop()
//.then(() => console.log('Collection dropped'))
//.catch(err => console.log('Drop collection error:', err));