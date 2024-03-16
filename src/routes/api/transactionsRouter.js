const express = require("express");

const {
    addIncome,
    removeIncome,
} = require("../../controllers/incomeController");

const router = express.Router();

router.post("/add-income", addIncome);
router.delete("/remove-income/:incomeId", removeIncome);

module.exports = router;
