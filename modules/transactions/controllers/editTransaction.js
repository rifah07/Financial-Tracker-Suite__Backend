const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw "You must enter Transaction Id";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  const existingTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!existingTransaction) throw "Transaction not found";

  const updateData = {};
  const updateFields = {};

  if (remarks !== undefined) {
    updateData.remarks = remarks;
    updateFields.remarks = remarks;
  }

  if (amount !== undefined) {
    updateData.amount = amount;
    updateFields.amount = amount;
  }

  if (transaction_type !== undefined) {
    const lowercaseType = transaction_type.toLowerCase();
    if (lowercaseType !== "income" && lowercaseType !== "expense") {
      throw "Transaction type must be income or expense";
    }
    updateData.transaction_type = lowercaseType;
    updateFields.transaction_type = lowercaseType;
  }

  if (Object.keys(updateFields).length === 0) {
    throw "No update fields provided";
  }

  if (existingTransaction.transaction_type.toLowerCase() === "income") {
    await usersModel.updateOne(
      { _id: existingTransaction.user_id },
      { $inc: { balance: -existingTransaction.amount } },
      { runValidators: true }
    );
  } else {
    await usersModel.updateOne(
      { _id: existingTransaction.user_id },
      { $inc: { balance: existingTransaction.amount } },
      { runValidators: true }
    );
  }

  // Update the transaction
  await transactionModel.updateOne(
    { _id: transaction_id },
    updateData,
    { runValidators: true }
  );

  // Recalculate balance impact if transaction type or amount changed
  if (updateFields.transaction_type || updateFields.amount) {
    const finalAmount = updateFields.amount || existingTransaction.amount;
    const finalType = (updateFields.transaction_type || existingTransaction.transaction_type).toLowerCase();

    if (finalType === "income") {
      await usersModel.updateOne(
        { _id: existingTransaction.user_id },
        { $inc: { balance: finalAmount } },
        { runValidators: true }
      );
    } else {
      await usersModel.updateOne(
        { _id: existingTransaction.user_id },
        { $inc: { balance: -finalAmount } },
        { runValidators: true }
      );
    }
  }

  res.status(200).json({
    status: "Transaction updated successfully!",
    updatedFields: Object.keys(updateFields)
  });
};

module.exports = editTransaction;