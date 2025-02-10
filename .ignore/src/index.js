// This code sets up an HTTP server using Node.js. It imports the necessary modules, normalizes the port from the environment or defaults to 3000, and handles errors related to server startup. The server listens on the specified port and logs a message when it is ready to accept connections.
const fs = require('fs');
const https = require('https')
const http = require('http')
const express = require('express');
const app = express();
const socketio = require('socket.io');
const chatHandler = require('./videoChat/handler');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : (port >= 0 ? port : false);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
  
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//we need a key and cert to run https
//we generated them with mkcert
// $ mkcert create-ca
// $ mkcert create-cert
// const key = fs.readFileSync('cert.key');
// const cert = fs.readFileSync('cert.crt');

//we changed our express setup so we can use https
//pass the key and cert to createServer on https
// const expressServer = https.createServer({key, cert}, app);

const expressServer = http.createServer(app);

// Set up Socket.IO
const io = socketio(expressServer, {
  cors: {
    origin: ['http://localhost:5173', 'https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com'],
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Initialize chat handler
const chat = chatHandler();
chat.init(io, app);

expressServer.on("error", errorHandler);
expressServer.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

expressServer.listen(port);