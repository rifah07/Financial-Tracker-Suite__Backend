const mongoose = require("mongoose");
const moment = require("moment");

const getTransactionSummary = async (req, res) => {
    const transactionsModel = mongoose.model("transactions");
    const { type } = req.query;

    if (!["daily", "monthly", "yearly"].includes(type)) {
        throw "Invalid summary type. Use 'daily', 'monthly', or 'yearly'";
    }

    const userId = req.user._id;

    let startDate, endDate;

    const today = moment().startOf("day");

    if (type === "daily") {
        startDate = today.toDate();
        endDate = moment(today).endOf("day").toDate();
    } else if (type === "monthly") {
        startDate = moment().startOf("month").toDate();
        endDate = moment().endOf("month").toDate();
    } else if (type === "yearly") {
        startDate = moment().startOf("year").toDate();
        endDate = moment().endOf("year").toDate();
    }

    const transactions = await transactionsModel.find({
        user_id: userId,
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((tx) => {
        if (tx.transaction_type === "income") {
            totalIncome += tx.amount;
        } else if (tx.transaction_type === "expense") {
            totalExpense += tx.amount;
        }
    });

    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
        status: "success",
        summaryType: type, // daily/monthly/yearly
        totalIncome,
        totalExpense,
        netBalance,
        totalTransactions: transactions.length,
    });
};

module.exports = getTransactionSummary;