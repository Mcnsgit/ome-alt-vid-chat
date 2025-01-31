const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true,
    sparse: true // This allows multiple null values
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [6, "Password should be at least 6 characters"]
  },
  //For anonymous users
  isAnonymous: { 
    type: Boolean, 
    default: false 
  },
  anonymousId: { 
    type: String, 
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        // Only require anonymousId if isAnonymous is true
        return !this.isAnonymous || (this.isAnonymous && v);
      },
      message: 'Anonymous users must have an anonymousId'
    }
  },
   // New profile fields
   preferredLanguage: {
    type: String,
    default: 'english',
    enum: ['english', 'spanish', 'french']
},
  bio: {
      type: String,
      maxlength: 500
  },
  interests: [String],
  gender: {
      type: String,
      default: "any",
      enum: ["any", "male", "female", "other"]
  },
  location: String,
  lastActive: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  reportCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Drop and recreate the model to ensure index changes take effect
mongoose.models = {};
module.exports = mongoose.model("Users", userSchema);
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
