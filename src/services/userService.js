const User = require("../schemas/user");

async function addNewUser(userData, token) {
  return await User.create(userData);
}

async function findUserByEmail(email) {
  return await User.findOne({ email: email });
}

async function findUserById(id) {
  return await User.findById(id);
}

async function updateUserToken(id, token) {
  return await User.findByIdAndUpdate(id, { token: token });
}

const updateUsersBalance = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  return user;
};

async function findUserByGoogleId({ sub: googleId }) {
  return await User.findOne({ googleId });
}

async function createUser({ sub: googleId, email }) {
  const user = new User({ googleId, email });
  await user.save();
  return user;
}

module.exports = {
  addNewUser,
  findUserByEmail,
  findUserById,
  updateUserToken,
  updateUsersBalance,
  findUserByGoogleId,
  createUser,
};
