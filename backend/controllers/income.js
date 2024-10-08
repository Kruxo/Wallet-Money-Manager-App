const IncomeSchema = require("../models/IncomeModel");

//POST
exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body //destructs everything inside the brackets
    console.log(req.body);

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    }) //Creating an instance of IncomeSchema from IncomeModel.js
     
     try {
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: "All fields are required!"})
        }
        if(amount <= 0 || !amount === "number") {
            return res.status(400).json({message: "Amount must be a positive number!"})
        }
        await income.save(); //Saves the income instance to the mongodb database
        res.status(200).json({message: "Income Added"})
     } catch (error) {
        res.status(500).json({message: "Server error"})
     }

     console.log(income);
}

//GET
exports.getIncomes = async (req, res) => {
    
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1}) //Using sort to put the last created income item to the top
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

//DELETE
exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income Deleted"})
        })
        .catch((err) => {
            res.status(500).json({message: "Server error"})
        })
}