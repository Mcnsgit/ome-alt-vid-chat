// config/authConfig.js
require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret",
  SALT_ROUNDS: 10,
  ANON_SESSION_DURATION: "2h",
  SESSION_DURATION: "7d",
};
