const transactionsService = require("../services/transactionsService");

const { validateTransaction } = require("../validators/transactionValidator");

const addTransaction = async (req, res, next) => {
    try {
        await validateTransaction(req.body);
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
        const transactions =
            await transactionsService.getIncomeTransactionsByUser(req.user.id);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

const getExpensesTransactionsByUser = async (req, res, next) => {
    try {
        const transactions =
            await transactionsService.getExpensesTransactionsByUser(
                req.user.id
            );
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

const deleteTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user.id;

        const result = await transactionsService.deleteTransaction(
            transactionId,
            userId
        );

        if (result === 400) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message:
                    "Bad request, invalid transaction ID or transaction does not belong to the user.",
            });
        }

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Transaction successfully deleted.",
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "Bad request, invalid transaction ID format.",
            });
        }
        console.error(error);
        next(error);
    }
};

module.exports = {
    addTransaction,
    getIncomeTransactionsByUser,
    getExpensesTransactionsByUser,
    deleteTransaction,
};
