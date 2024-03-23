const express = require("express");
const categoriesController = require("../../controllers/categoryController");

const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.get("/income", verifyToken, categoriesController.getIncomeCategories);
router.get(
    "/expenses",
    verifyToken,
    categoriesController.getExpensesCategories
);

module.exports = router;
