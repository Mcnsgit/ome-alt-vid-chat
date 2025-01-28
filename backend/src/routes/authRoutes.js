const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/UserSchema');
const generateJWT = require('../utils/generateJWT.js');
const authController = require('../controllers/authController');
const passport = require('../config/passport.js');


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post("/anonymous", async (req, res) => {
  try {
    const user = await User.create({
      isAnonymous: true,
      anonymousId: crypto.randomBytes(16).toString("hex"),
      tempInterest: req.body.interests,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h", // Temporary session
    });

    res.json({ token, isAnonymous: true });
  } catch (error) {
    res.status(500).json({ error: "Anonymous login failed" });
  }
});
module.exports = router;
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/chat",
//     failureRedirect: "/login",
//   })
// );