const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
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
        enum: ["SALARY", "ADD.INCOME"],
    },
    date: {
        type: Date,

        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const Income = mongoose.model("income", incomeSchema);

module.exports = Income;
