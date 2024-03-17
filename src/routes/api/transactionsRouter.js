const express = require("express");

const transactionsController = require("../../controllers/transactionsController");
const authMiddleware = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/", authMiddleware, transactionsController.addTransaction);
router.get(
    "/income",
    authMiddleware,
    transactionsController.getIncomeTransactionsByUser
);
router.get(
    "/expenses",
    authMiddleware,
    transactionsController.getExpensesTransactionsByUser
);
router.delete("/", authMiddleware, transactionsController.deleteTransaction);

module.exports = router;
