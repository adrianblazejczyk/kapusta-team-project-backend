require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/userService");

const handleJoiError = (status, message, res) => {
  res.status(status).json({ message: message });
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleJoiError(403, "Not authorized", res);
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await findUserById(decodedToken.id);

    if (!user || user.token !== token) {
      return handleJoiError(403, "Not authorized", res);
    }

    req.user = user;
    next();
  } catch (error) {
    return handleJoiError(403, "Not authorized", res);
  }
};

module.exports = verifyToken;
