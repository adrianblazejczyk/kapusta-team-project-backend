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

module.exports = {
  addNewUser,
  findUserByEmail,
  findUserById,
};
