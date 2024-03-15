const { addNewIncome, deleteIncome } = require("../services/incomeService");

const addIncome = async (req, res, next) => {
    try {
        const {
            description,
            amount,
            category, // date
        } = req.body;
        // const ownerId = req.user._id;
        if (
            !description ||
            !amount ||
            !category // || !date
        ) {
            return res
                .status(400)
                .json({ message: "Missing required field(s)" });
        }

        const dataToAdd = {
            description,
            amount,
            category, // , date
        };
        if (dataToAdd.error) {
            return res
                .status(400)
                .json({ message: dataToAdd.error.details[0].message });
        }
        const newIncome = await addNewIncome(
            {
                description,
                amount,
                category, // , date
            } // , ownerId
        );
        res.status(201).json(newIncome);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addIncome,
    deleteIncome,
};
