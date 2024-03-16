const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { newUserAuthSchema } = require("../validators/userValidation");
const {
  addNewUser,
  findUserByEmail,
  findUserById,
  updateUserToken,
} = require("../services/userService");

const SECRET_KEY = process.env.SECRET_KEY;

const handleJoiError = (statusCode, message, res) => {
  console.log("Response object:", res);
  if (typeof res.status !== "function") {
    console.log("Response object does not have a status function");
  }
  res.status(statusCode).json({ message });
};

const signup = async (req, res, next) => {
  try {
    const { error } = newUserAuthSchema.validate(req.body);
    if (error) return handleJoiError(400, error.message, res);
    const { password, email } = req.body;
    const isEmailTaken = await findUserByEmail(email);
    if (isEmailTaken) return handleJoiError(400, "Email in use", res);
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await addNewUser({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Account created successfully",
      email: response.email,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const { error } = newUserAuthSchema.validate(req.body);
    if (error) return handleJoiError(400, error.message, res);
    const userData = await findUserByEmail(email);
    if (!userData)
      return handleJoiError(401, "Email or password is wrong", res);

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid)
      return handleJoiError(401, "Email or password is wrong", res);

    const payload = { id: userData._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
    await updateUserToken(userData._id, token);

    res.status(201).json({
      message: "Login successful",
      token: token,
      user: {
        email: userData.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    const dataUser = await findUserById(id);
    if (!dataUser) return handleJoiError("Not authorized", res);
    await updateUserToken(id, null);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userData = await findUserById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id, email } = userData;

    res.status(200).json({ user: { _id, email } });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, currentUser };
