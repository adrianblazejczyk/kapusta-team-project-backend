const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
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
});

const User = mongoose.model("user", userSchema);

module.exports = User;
