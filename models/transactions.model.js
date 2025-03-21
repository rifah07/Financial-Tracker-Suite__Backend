const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsModel;