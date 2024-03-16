const Income = require("../schemas/income");

async function addNewIncome(userData) {
    return await Income.create(userData);
}

async function deleteIncome(id) {
    return await Income.findById(id);
}

module.exports = {
    addNewIncome,
    deleteIncome,
};
