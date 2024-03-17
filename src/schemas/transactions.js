const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["Income", "Expenses"],
        },
        category: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { versionKey: false }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
