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

const currUserAuthSchema = Joi.object({
    token: Joi.string().required(),
});

const checkUserEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    newUserAuthSchema,
    loginUserAuthSchema,
    currUserAuthSchema,
    checkUserEmailSchema,
};
