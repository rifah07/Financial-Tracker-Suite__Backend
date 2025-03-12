const express = require("express");
const usersModel = require("../../models/users.model");
const register = require("./controllers/register");

const userRoutes = express.Router();

// routes here

userRoutes.post("/register", register);

module.exports = userRoutes;