const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authRoutes = require('./src/routes/authRoutes')
const path = require("path");
//require database connection
const dbConnect = require('./src/db/dbConnect');
const User = require( './src/models/UserSchema');
const auth = require("./src/auth.js");
const cors = require("cors");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use(cors({
  origin: ['http://localhost:5173', 'https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    
    const user = new User({
      email: request.body.email,
      password: hashedPassword,
      // Only set username if provided
      ...(request.body.username && { username: request.body.username })
    });

    const result = await user.save();
    response.status(201).json({
      message: "User Created Successfully",
      result
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific error types
    if (error.code === 11000) {
      return response.status(400).json({
        message: "Email already exists",
        error: error.message
      });
    }
    
    response.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
});

// login endpoint
app.post("/login", async (request, response) => {
  try {
    // check if email and password are provided
    if (!request.body.email || !request.body.password) {
      return response.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: request.body.email });

    // if email exists
    if (!user) {
      return response.status(404).json({
        message: "Email not found",
      });
    }
    //compare password
    const passwordMatch = await bcrypt.compare(request.body.password, user.password);
    // if the passwords match
    if (!passwordCheck) {
      return response.status(400).json({
        message: "Invalid password",
      })
    }
    //   create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    // Return success response
    response.status(200).json({
      message: "Login Successful",
      email: user.email,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });

  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

//// Use auth routes
//app.use('/api/auth', authRoutes);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
