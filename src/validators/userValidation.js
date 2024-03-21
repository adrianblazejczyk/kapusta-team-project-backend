const Joi = require("joi");

// const bCrypt = require("bcryptjs");

const newUserAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    // token: Joi.string(),
});

const loginUserAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
});

const updateBalanceSchema = Joi.object({
    balance: Joi.number().min(0.01).required(),
});

module.exports = {
    newUserAuthSchema,
    loginUserAuthSchema,
    updateBalanceSchema,
};
