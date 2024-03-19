const reportService = require("../services/reportService");

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

module.exports = {
  getExpensesReport,
  getIncomeReport,
};
