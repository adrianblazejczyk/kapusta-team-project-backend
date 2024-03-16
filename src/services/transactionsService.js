const Transaction = require("../schemas/transactions");

async function getAllTransactions() {
  return await Transaction.find();
}

async function addNewTransaction(transactionData) {
  try {
    return await Transaction.create(transactionData);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteTransaction(transactionId) {
  try {
    return await Transaction.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllTransactions,
  addNewTransaction,
  deleteTransaction,
};
