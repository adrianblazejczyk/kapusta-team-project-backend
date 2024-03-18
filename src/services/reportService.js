const Transaction = require("../schemas/transactions");

const getExpensesReport = async (userId, year) => {
    const expensesReport = {};

    try {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);

        const transactions = await Transaction.find({
            user: userId,
            type: "Expenses",
            date: {
                $gte: startOfYear,
                $lte: endOfYear,
            },
        });

        if (transactions.length === 0) {
            throw new Error(
                "No expenses transactions found for the given user and year"
            );
        }

        transactions.forEach((transaction) => {
            const month = transaction.date.getMonth();
            const monthName = new Date(year, month).toLocaleString("default", {
                month: "long",
            });

            if (!expensesReport[monthName]) {
                expensesReport[monthName] = 0;
            }

            expensesReport[monthName] += transaction.amount;
        });

        return expensesReport;
    } catch (error) {
        console.error("Error while generating expenses report:", error);
        throw new Error("Error while generating expenses report");
    }
};

const getIncomeReport = async (userId) => {
    try {
        const allTransactions = await Transaction.find({
            user: userId,
            type: "Income",
        });
        const monthlySum = {};

        allTransactions.forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const key = `${year}-${month}`;

            if (monthlySum[key]) {
                monthlySum[key] += item.amount;
            } else {
                monthlySum[key] = item.amount;
            }
        });
        return monthlySum;
    } catch (err) {
        console.log(err.message);
    }
};
module.exports = {
    getExpensesReport,
    getIncomeReport,
};