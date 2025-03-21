const express = require("express");

const auth = require("../../middleware/auth");

const transactionRoutes = express.Router();

// routes here

transactionRoutes.use(auth);

//protected routes

module.exports = transactionRoutes;