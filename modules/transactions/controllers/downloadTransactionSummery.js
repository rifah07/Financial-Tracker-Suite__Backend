const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const moment = require("moment");

const downloadTransactionSummery = async (req, res) => {
    const transactionsModel = mongoose.model("transactions");
    const usersModel = mongoose.model("users");

    const { type } = req.query;

    if (!["daily", "monthly", "yearly"].includes(type)) {
        throw "Invalid report type. Use 'daily', 'monthly', or 'yearly'";
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

    const user = await usersModel.findById(userId).select("balance");

    const netChange = totalIncome - totalExpense;
    const initialBalance = user.balance - netChange;// backward-calculated
    const finalBalance = user.balance;


    // Generate PDF
    const doc = new PDFDocument();
    const filename = `${type}_report_${moment().format("YYYY-MM-DD")}.pdf`;

    // Set response headers
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Transaction Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Report Type: ${type.toUpperCase()}`);
    doc.text(`Date Range: ${moment(startDate).format("LL")} - ${moment(endDate).format("LL")}`);
    doc.text(`Total Transactions: ${transactions.length}`);
    doc.moveDown();

    doc.text(`Initial Balance: $${initialBalance}`);
    doc.text(`Total Income: $${totalIncome}`);
    doc.text(`Total Expense: $${totalExpense}`);
    doc.text(`Net Change in Balance: $${netChange}`);
    doc.text(`Current Balance: $${finalBalance}`);
    doc.moveDown();

    doc.text("Transactions:");
    doc.moveDown(0.5);

    transactions.forEach((tx, index) => {
        doc.text(`${index + 1}. ${tx.transaction_type.toUpperCase()} | Amount: $${tx.amount} | Remarks: ${tx.remarks} | Date: ${moment(tx.createdAt).format("LLL")}`);
    });
    doc.moveDown(3);

    doc.fontSize(10).text("All rights reserved", { align: "center" });
    doc.fontSize(10).text("@Finalcial Tracker Suite", { align: "center" });

    doc.end();
};

module.exports = downloadTransactionSummery;