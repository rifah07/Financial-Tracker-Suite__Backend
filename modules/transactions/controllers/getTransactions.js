const mongoose = require("mongoose");
const getTransactions = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  console.log(req.query);

  const transactions = await transactionsModel.find({
    user_id: req.user._id,
    ...req.query, // same as transaction_type: 'income'/'expense'
  });

  res.status(200).json({
    status: "All your transaction information are here",
    data: transactions,
  });
};

module.exports = getTransactions;