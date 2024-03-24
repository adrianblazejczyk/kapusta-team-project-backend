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
        description: {
            type: String,
        },
        amount: {
            type: Number,
            min: "0.01",
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
