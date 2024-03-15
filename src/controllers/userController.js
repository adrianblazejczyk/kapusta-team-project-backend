const bcrypt = require("bcrypt");

const { newUserAuthSchema } = require("../validators/userValidation");
const { addNewUser, findUserByEmail } = require("../services/userService");

const handleJoiError = (status, message, res) => {
  res.status(status).json({ message: message });
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
      email: response.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
