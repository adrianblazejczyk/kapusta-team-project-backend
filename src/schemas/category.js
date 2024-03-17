const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    type: { type: String, required: true },
    category: [String],
});

module.exports = mongoose.model("Category", categorySchema);
