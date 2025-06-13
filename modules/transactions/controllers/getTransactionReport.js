const mongoose = require("mongoose");
const { Parser } = require("json2csv"); // For CSV download

const getTransactionReport = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const { type, start_date, end_date, download } = req.query;

  const filter = {
    user_id: req.user._id,
  };

  // Filter by date range
  if (start_date || end_date) {
    filter.createdAt = {};
    if (start_date) filter.createdAt.$gte = new Date(start_date);
    if (end_date) filter.createdAt.$lte = new Date(end_date);
  }

  // Optional type filter
  if (type && ["income", "expense"].includes(type.toLowerCase())) {
    filter.transaction_type = type.toLowerCase();
  }

  const transactions = await transactionsModel.find(filter);

  if (download === "csv") {
    const fields = ["_id", "amount", "transaction_type", "remarks", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transaction_report.csv");
    return res.send(csv);
  }

  res.status(200).json({
    status: "Success",
    data: transactions,
  });
};

module.exports = getTransactionReport