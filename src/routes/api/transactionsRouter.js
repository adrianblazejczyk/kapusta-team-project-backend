const express = require("express");
const {
  getTransactions,
  postTransaction,
  removeTransaction,
} = require("../../controllers/transactionsController");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", postTransaction);

router.delete("/:transactionId", removeTransaction);

module.exports = router;
