const {
  getAllTransactions,
  addNewTransaction,
  deleteTransaction,
} = require("../services/transactionsService");

const getTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTransaction = async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;
    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transactionData = {
      description,
      amount,
      date,
      category,
    };
    const transaction = await addNewTransaction(transactionData);
    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }
    const transaction = await deleteTransaction(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  postTransaction,
  removeTransaction,
};
