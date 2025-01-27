const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const socketIO = require("socket.io");
const authRoutes = require("./routes/authRoutes");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


const server = http.createServer(app);
const io = socketIO(server);

io.on(connection, (socket) => {
    console.log("a user connected");

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database Connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes (to be defined later)
app.get('/', (req, res) => {
    res.send('Welcome to Omegle Alternative API!');
});
app.get("/api/auth", authRoutes)
// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
