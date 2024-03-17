const reportService = require("../services/reportService");

const getExpensesReport = async (req, res, next) => {
  try {
    const { userId, year } = req.query;

    if (!userId || !year) {
      return res.status(400).json({ message: "User ID and year are required" });
    }

    const expensesReport = await reportService.getExpensesReport(userId, year);

    res.json(expensesReport);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpensesReport,
};
