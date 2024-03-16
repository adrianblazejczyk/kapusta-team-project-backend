const Income = require("../schemas/income");

async function addNewIncome(userData) {
    try {
        return await Income.create(userData);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteIncome(incomeId) {
    try {
        return await Income.findByIdAndDelete({ _id: incomeId });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    addNewIncome,
    deleteIncome,
};
