const User = require("../schemas/user");

async function addNewUser(userData) {
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

module.exports = {
  addNewUser,
  findUserByEmail,
  findUserById,
  updateUserToken,
  updateUsersBalance,
};
