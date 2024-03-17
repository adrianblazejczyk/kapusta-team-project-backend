const transactionsService = require("../services/transactionsService");
const mongoose = require("mongoose");

const addTransaction = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const transaction = await transactionsService.addTransaction(
      req.body,
      req.user.id
    );
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getIncomeTransactionsByUser = async (req, res, next) => {
  try {
    const transactions = await transactionsService.getIncomeTransactionsByUser(
      req.user.id
    );
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const getExpensesTransactionsByUser = async (req, res, next) => {
  try {
    const transactions =
      await transactionsService.getExpensesTransactionsByUser(req.user.id);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    await transactionsService.deleteTransaction(req.body.id, req.user.id);
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTransaction,
  getIncomeTransactionsByUser,
  getExpensesTransactionsByUser,
  deleteTransaction,
};
