const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET routes for rendering pages
router.get("/register", (req, res) => {
  res.json({ message: 'Register page' });
});

router.get("/login", (req, res) => {
  res.json({ message: 'Login page' });
});

// POST routes for handling form submissions
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