const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  //For anonymous users
    isAnonymous: { type: Boolean, default: false },
    anonymousId: { type: String, unique: true },
    tempInterest: [String],

    // Moderation tracking
    reportCount: { type: Number, default: 0 },
    lastActive: Date,

    // all users
    isActive: { type: Boolean, default: false },
    gender: { type: String, default: "Any" },
    interests: [String],
    location: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    reportedCount: { type: Number, default: 0 },
  });

  // Hash password before saving to database
  userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
  
});


module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   // For registered users
//   username: { type: String, unique: true },
//   // email field
//   email: {
//     type: String,
//     required: [true, "Please provide an Email!"],
//     unique: [true, "Email Exist"],
//   },

//   //   password field
//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     unique: false,
//   },
//   googleId: String,

//      // For anonymous users
//   isAnonymous: { type: Boolean, default: false },
//   anonymousId: { type: String, unique: true },
//   tempInterest: [String],

//   // Moderation tracking
//   reportCount: { type: Number, default: 0 },
//   lastActive: Date,

//   // all users
//   isActive: { type: Boolean, default: false },
//   gender: { type: String, default: "Any" },
//   interests: [String],
//   location: { type: String, default: "" },
//   createdAt: { type: Date, default: Date.now },
//   reportedCount: { type: Number, default: 0 },
// });

// // Hash password before saving to database
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;
