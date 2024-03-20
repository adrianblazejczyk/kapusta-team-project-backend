const reportService = require("../services/reportService");
const Transaction = require("../schemas/transactions");

const getExpensesReport = async (req, res, next) => {
  try {
    const expensesReport = await reportService.getExpensesReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      expensesReport,
    });
  } catch (error) {
    next(error);
  }
};

const getIncomeReport = async (req, res, next) => {
  try {
    const report = await reportService.getIncomeReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailedReport = async (req, res, next) => {
  try {
    const { year, month } = req.query;

    if (!/^\d{4}$/.test(year)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid year value. Please provide a valid year.",
      });
    }

    if (
      !/^\d{1,2}$/.test(month) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid month value. Please provide a valid month between 1 and 12.",
      });
    }

    const report = await reportService.getDetailedReport(
      req.user.id,
      parseInt(year),
      parseInt(month)
    );

    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "No transactions found for the provided parameters.",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      report: report,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailedCategoryReport = async (req, res, next) => {
  try {
    const { type, category } = req.query;

    if (!type || (type !== "Income" && type !== "Expenses")) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid or missing type parameter. Please provide either 'Income' or 'Expenses'.",
      });
    }

    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "Missing category parameter. Please provide a category.",
      });
    }

    const transactions = await Transaction.find({
      user: req.user.id,
      type: type,
      category: category,
    });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No transactions found for the provided parameters.",
      });
    }

    const report = transactions.map((transaction) => ({
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount,
    }));

    res.status(200).json({
      status: "success",
      code: 200,
      report: report,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpensesReport,
  getIncomeReport,
  getDetailedReport,
  getDetailedCategoryReport,
};
