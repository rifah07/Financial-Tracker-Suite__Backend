const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const getTransactionReport = require("./controllers/getTransactionReport");

const transactionRoutes = express.Router();

// routes here

transactionRoutes.use(auth);

//protected routes

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);
transactionRoutes.get("/report", getTransactionReport)
transactionRoutes.patch("/", editTransaction);
transactionRoutes.delete("/:transaction_id", deleteTransaction);

module.exports = transactionRoutes;