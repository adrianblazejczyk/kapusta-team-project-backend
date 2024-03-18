const express = require("express");
const router = express.Router();

const reportController = require("../../controllers/reportController");
const authMiddleware = require("../../middlewares/verifyToken");

router.get("/expenses", authMiddleware, reportController.getExpensesReport);
router.get("/income", authMiddleware, reportController.getIncomeReport);
module.exports = router;
