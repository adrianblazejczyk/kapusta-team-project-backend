const express = require("express");


const {
    addIncome,
    removeIncome,
} = require("../../controllers/incomeController");

const {
    getTransactions,
    postTransaction,
    removeTransaction,
} = require("../../controllers/transactionsController");


const router = express.Router();
// income
router.post("/add-income", addIncome);
router.delete("/remove-income/:incomeId", removeIncome);

// transaction
router.get("/", getTransactions);

router.post("/", postTransaction);

router.delete("/:transactionId", removeTransaction);

module.exports = router;
