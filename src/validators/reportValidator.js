const Joi = require("joi");

const reportQuerySchema = Joi.object({
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  month: Joi.number().integer().min(1).max(12).required(),
});

const categoryReportQuerySchema = Joi.object({
  type: Joi.string().valid("Income", "Expenses").required(),
  category: Joi.string().required(),
});

module.exports = {
  reportQuerySchema,
  categoryReportQuerySchema,
};
