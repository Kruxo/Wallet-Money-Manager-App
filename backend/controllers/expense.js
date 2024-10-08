const ExpenseSchema = require("../models/ExpenseModel");

//POST
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body //destructs everything inside the brackets
    console.log(req.body);

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    }) //Creating an instance of ExpenseSchema from ExpenseModel.js
     
     try {
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: "All fields are required!"})
        }
        if(amount <= 0 || !amount === "number") {
            return res.status(400).json({message: "Amount must be a positive number!"})
        }
        await expense.save(); //Saves the expense instance to the mongodb database
        res.status(200).json({message: "Expense Added"})
     } catch (error) {
        res.status(500).json({message: "Server error"})
     }

     console.log(expense);
}

//GET
exports.getExpenses = async (req, res) => {
    
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1}) //Using sort to put the last created expense item to the top
        res.status(200).json(expenses )
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

//DELETE
exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: "Expense Deleted"})
        })
        .catch((err) => {
            res.status(500).json({message: "Server error"})
        })
}