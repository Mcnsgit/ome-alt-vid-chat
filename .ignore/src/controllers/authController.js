const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const { JWT_SECRET, SALT_ROUNDS } = require("../config/authConfig");
const { generateAnonymousId } = require("../utils/authHelpers.js");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email already exists"
            : "Username is taken",
      });
    }

    const user = new User({
      username,
      email,
      password,
      interests: [],
      lastActive: new Date(),
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, isAnonymous: false },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        isAnonymous: false,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, isAnonymous: false },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        isAnonymous: false,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.anonymousLogin = async (req, res) => {
  try {
    const user = await User.create({
      isAnonymous: true,
      anonymousId: generateAnonymousId(),
      tempInterests: req.body.interests || [],
      lastActive: new Date(),
    });

    const token = jwt.sign(
      { userId: user._id, isAnonymous: true },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        isAnonymous: true,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Anonymous session creation failed" });
  }
};

