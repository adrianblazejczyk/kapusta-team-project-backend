const categoriesService = require("../services/categoryService");

const getIncomeCategories = async (req, res, next) => {
    try {
        const categories = await categoriesService.getIncomeCategories();
        res.status(200).json(categories.items);
        console.log(categories.items);
    } catch (error) {
        next(error);
    }
};

const getExpensesCategories = async (req, res, next) => {
    try {
        const categories = await categoriesService.getExpensesCategories();
        res.status(200).json(categories.items);
        console.log(categories.items);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getIncomeCategories,
    getExpensesCategories,
};
