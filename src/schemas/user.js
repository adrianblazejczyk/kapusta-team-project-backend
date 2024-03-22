const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    validate: {
      validator: function (value) {
        // Check if either password is provided or googleId is provided
        return value || this.googleId;
      },
      message: "Password is required if googleId is not provided",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
  },
  // FOR PASSWORD USAGE IN THE FUTURE
  // verify: {
  //     type: Boolean,
  //     default: false,
  // },
  // verificationToken: {
  //     type: String,
  //     required: [true, "Verify token is required"],
  // },

  //
});
// FOR PASSWORD USAGE IN THE FUTURE
// userSchema.methods.setPassword = function (password) {
//     this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
// };

// userSchema.methods.validPassword = function (password) {
//     return bCrypt.compareSync(password, this.password);
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
