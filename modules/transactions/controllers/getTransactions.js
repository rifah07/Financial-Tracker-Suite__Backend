const mongoose = require("mongoose");
const getTransactions = (req, res) => {
  res.status(200).json({
    status: "See Transactions",
  });
};

module.exports = getTransactions;