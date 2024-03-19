const Transaction = require("../schemas/transactions");

const getExpensesReport = async (userId) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      type: "Expenses",
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
