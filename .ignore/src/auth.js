const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      return response.status(401).json({
        message: "Authentication required"
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    request.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    response.status(401).json({
      message: "Invalid or expired token"
    });
  }
};