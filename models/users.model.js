const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Please provide full name"],
  },
  email: {
    type: String,
    required: [true, "Email is required to register"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  balance: {
    type: Number,
    required: [true, "Current balance is required"],
    default: 0,
  },
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;