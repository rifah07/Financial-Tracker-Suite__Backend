require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
const setupSwagger = require("./swagger/config"); 

require("dotenv").config();


const app = express();
app.use(cors());
app.use(cookieParser());


// Swagger setup
setupSwagger(app);

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


// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Financial Tracker Suite",
    version: "1.0.0",
    documentation: `http://localhost:${process.env.PORT || 8000}/api-docs`,
    endpoints: {
      users: "/api/users",
      transactions: "/api/transactions",
    },
  });
});

// Handle undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not Found!",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});