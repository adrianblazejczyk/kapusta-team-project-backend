const reportService = require("../services/reportService");
// const transaction = require("../schemas/transactions");
const {
  reportQuerySchema,
  categoryReportQuerySchema,
} = require("../validators/reportValidator");

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
    const { error, value } = reportQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { year, month } = value;

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
    const { error, value } = categoryReportQuerySchema.validate(req.query);
    console.log(error);
    // if (error) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: error.details[0].message,
    //   });
    // }

    const { type, category, year, month } = value;
    console.log(value);
    const transactions = await reportService.getTransactionsFromCategory(
      req.user.id,
      parseInt(year),
      parseInt(month),
      type,
      category
    );
    console.log(transactions);
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No transactions found for the provided parameters.",
      });
    }

    // const report1 = transactions.map((transaction) => ({
    //   date: transaction.date,
    //   description: transaction.description,
    //   amount: transaction.amount,
    // }));

    res.status(200).json({
      status: "success",
      code: 200,
      report: transactions,
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
