const express = require("express");
const usersModel = require("../../models/users.model");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");

const userRoutes = express.Router();

// routes here

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.use(auth);

//protected routes

userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;