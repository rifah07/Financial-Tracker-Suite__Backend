const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");

const transactionRoutes = express.Router();

// routes here

transactionRoutes.use(auth);

//protected routes

transactionRoutes.post("/addIncome", addIncome);

module.exports = transactionRoutes;