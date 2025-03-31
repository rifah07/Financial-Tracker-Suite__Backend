const express = require("express");
const usersModel = require("../../models/users.model");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const deleteAccount = require("./controllers/deleteAccount");

const userRoutes = express.Router();

// Public routes (no auth required)
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);

// 🔐 Protected routes (require auth middleware)
userRoutes.use(auth);

userRoutes.get("/dashboard", userDashboard);
userRoutes.delete("/deleteAccount/:user_id", deleteAccount);

module.exports = userRoutes;