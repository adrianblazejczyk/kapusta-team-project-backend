const Joi = require("joi");

const transactionSchema = Joi.object({
    date: Joi.date().required(),
    type: Joi.string().valid("Income", "Expenses").required(),
    category: Joi.string().required(),
    amount: Joi.number().required(),
    user: Joi.string().required(),
});

const validateTransaction = (transactionData) => {
    return transactionSchema.validate(transactionData, { abortEarly: false });
};

module.exports = { validateTransaction };
