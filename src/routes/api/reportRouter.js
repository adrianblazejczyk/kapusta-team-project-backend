const express = require("express");
const router = express.Router();

const reportController = require("../../controllers/reportController");
const authMiddleware = require("../../middlewares/verifyToken");

router.get("/detailed", authMiddleware, reportController.getDetailedReport);
router.get(
    "/detailed/category",
    authMiddleware,
    reportController.getDetailedCategoryReport
);
router.post("/expenses", authMiddleware, reportController.getExpensesReport);
router.post("/income", authMiddleware, reportController.getIncomeReport);
module.exports = router;
