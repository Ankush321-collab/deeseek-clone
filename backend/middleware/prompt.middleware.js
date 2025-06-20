const jwt = require("jsonwebtoken");
const { jwt_user_password } = require("../config");

function usermiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No token provided"
    });
  }

  const token = authHeader.split(" ")[1]; // ✅ Corrected split syntax

  try {
    const decoded = jwt.verify(token, jwt_user_password); // ✅ Use jwt.verify, not token.verify
    req.userId = decoded.id;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
}

module.exports = { usermiddleware };
