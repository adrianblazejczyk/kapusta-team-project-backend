const reportService = require("../services/reportService");

const getExpensesReport = async (req, res, next) => {
    try {
        const { userId, year } = req.query;

        if (!userId || !year) {
            return res
                .status(400)
                .json({ message: "User ID and year are required" });
        }

        const expensesReport = await reportService.getExpensesReport(
            userId,
            year
        );

        res.json(expensesReport);
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
