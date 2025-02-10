const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authRoutes = require('./routes/authRoutes.js');
const path = require("path");
const dbConnect = require('./db/dbConnect.js');
const User = require('./models/UserSchema.js');
const auth = require("./auth.js");
const cors = require("cors");
const socketController = require('./controllers/socketController.js');
const ioHandler = socketController(server)


// Execute database connection
dbConnect();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// Body parser configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});
// register endpoint
app.post("/register", async (request, response) => {
  try {
    const user = new User({
      email: request.body.email,
      password: request.body.password,
      isAnonymous: false, // explicitly set this to false for registered users
      lastActive: new Date(),
      isActive: true
    });
    
    const result = await user.save();
    response.status(201).json({
      message: "User Created Successfully",
      result: {
        email: result.email,
        isAnonymous: result.isAnonymous,
        isActive: result.isActive
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    // Handle specific error types
    if (error.code === 11000) {
      return response.status(400).json({
        message: "Email already exists",
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
    console.log("Login attempt for email:", request.body.email);
    
    // Check if email and password are provided
    if (!request.body.email || !request.body.password) {
      console.log("Missing email or password");
      return response.status(400).json({
        message: "Email and password are required"
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email: request.body.email });
    
    if (!user) {
      console.log("User not found for email:", request.body.email);
      return response.status(404).json({
        message: "Email not found"
      });
    }
    
    // Compare password
    const passwordMatch = await bcrypt.compare(request.body.password, user.password);
    console.log("Password match result:", passwordMatch);
    
    if (!passwordMatch) {
      return response.status(400).json({
        message: "Invalid password"
      });
    }

    
    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      process.env.JWT_SECRET || "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    // Return success response
    response.status(200).json({
      message: "Login Successful",
      email: user.email,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

  } catch (error) {
    console.error("Login error details:", error);
    response.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});
app.get('/getChannels', ioHandler.getChannels);

app.use('/', profileRoutes);
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  io.emit('message', message);
  res.sendStatus(200).json({ success: true });
});

// Free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// Authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;

