// This code sets up an HTTP server using Node.js. It imports the necessary modules, normalizes the port from the environment or defaults to 3000, and handles errors related to server startup. The server listens on the specified port and logs a message when it is ready to accept connections.
const http = require("http");
const app = require("./app");

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

const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);