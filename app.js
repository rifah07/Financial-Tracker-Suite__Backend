require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(cookieParser());


mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected successfully ");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

// models initialization

require("./models/users.model");
require("./models/transactions.model");

app.use(express.json());

//routes

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//end of all routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not Found!",
  });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully");
});