const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxLength: 60,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Transport",
            "Products",
            "Healt",
            "Alcohol",
            "Entertainment",
            "Housing",
            "Technique",
            "Communal, communication",
            "Sports, hobbies",
            "Education",
            "Other",
        ],
    },
    // date: {
    // type: Date,

    //  required: false,
    // },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
