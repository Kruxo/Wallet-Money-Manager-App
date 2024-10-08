//global state to access incomes from the API

import React, { useContext, useState } from "react"
import axios from "axios" //To communicate with the backend part of the app

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([]) //initially the state is an empty array
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //POST REQUEST - Adding the income to our mongodb database in the backend
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes() //Needs to run the getIncomes after adding and deleteing considering our usestate in income.js
    }

    //GET REQUEST
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    //DELETE REQUEST
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    //For the dashboard charts and nav
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome += income.amount
        })

        return totalIncome;
    }

    //POST REQUEST
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    //GET REQUEST
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    //DELETE REQUEST
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    //For the dashboard charts and nav
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    //Dashboard
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    //An array that sorts and lists income and expenses
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3) //returns a list of the 3 latest income/expenses in the dashboard
    }

    //Send the functions above to the GlobalContext Provider with value
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            deleteIncome,
            totalIncome,
            incomes,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )

} //Children is App.js and we will wrap it in the GlobalProvider in index.js

//To get access to the context any where we want to access it
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}