const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  // Generate Token
    const authHeader= jwt.sign({ _id: user._id }, authKeys.jwtSecretKey, {
      expiresIn: "1d",
    });

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, authKeys.jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
