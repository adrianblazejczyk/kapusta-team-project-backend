const Category = require("../schemas/category");

const getIncomeCategories = async () => {
    try {
        const categories = await Category.findOne({
            name: "Income",
        });
        return categories;
    } catch (err) {
        console.log(err.message);
    }
};

const getExpensesCategories = async () => {
    try {
        const categories = await Category.findOne({
            name: "Expenses",
        });
        return categories;
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    getIncomeCategories,
    getExpensesCategories,
};
