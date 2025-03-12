require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");

require("dotenv").config();

const app = express();

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

app.use(express.json());

//routes

app.use("/api/users", userRoutes);

//end of all routes
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully");
});