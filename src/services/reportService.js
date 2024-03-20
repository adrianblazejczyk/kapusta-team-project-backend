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

const getDetailedReport = async (userId, year, month) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
    });

    const report = {
      Balance: 0,
      Income: 0,
      Expenses: 0,
      IncomeCategories: {},
      ExpenseCategories: {},
    };

    allTransactions.forEach((item) => {
      if (item.type === "Income") {
        report.Income += item.amount;
        report.Balance += item.amount;

        if (!report.IncomeCategories[item.category]) {
          report.IncomeCategories[item.category] = 0;
        }
        report.IncomeCategories[item.category] += item.amount;
      } else {
        report.Expenses += item.amount;
        report.Balance -= item.amount;

        if (!report.ExpenseCategories[item.category]) {
          report.ExpenseCategories[item.category] = 0;
        }
        report.ExpenseCategories[item.category] += item.amount;
      }
    });

    return report;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const getDetailedCategoryReport = async (userId, type, category) => {
  try {
    // Pobranie wszystkich transakcji z określonym typem i kategorią
    const transactions = await Transaction.find({
      user: userId,
      type: type,
      category: category,
    });

    // Sprawdzenie czy znaleziono jakiekolwiek transakcje
    if (!transactions || transactions.length === 0) {
      return null; // Jeśli nie ma transakcji, zwracamy null
    }

    // Przygotowanie raportu
    const report = transactions.map((transaction) => ({
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount,
    }));

    return report;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  getDetailedCategoryReport,
};

module.exports = {
  getExpensesReport,
  getIncomeReport,
  getDetailedReport,
  getDetailedCategoryReport,
};
