const mongoose = require("mongoose");

const deleteAccount = async (req, res) => {
  const usersModel = mongoose.model("users");
  const RefreshToken = require("../../../models/refreshToken"); // For cleaning up tokens
  const transactionsModel = mongoose.model("transactions"); // For cleaning up user data

  const user_id = req.user._id;

  if (!user_id) {
    return res.status(400).json({
      status: "Failed",
      message: "User ID required"
    });
  }

  // Check if user exists before deletion
  const userExists = await usersModel.findById(user_id);
  if (!userExists) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found or already deleted"
    });
  }

  // Delete user's refresh tokens first
  await RefreshToken.deleteMany({ userId: user_id });

  // Delete user's transactions
  await transactionsModel.deleteMany({ user_id: user_id });

  // Delete the user account
  const deletedUser = await usersModel.deleteOne({ _id: user_id });

  if (deletedUser.deletedCount === 0) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found or already deleted"
    });
  }

  // Clear cookies on account deletion
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.status(200).json({
    status: "Success",
    message: "Account deleted successfully",
  });

};

module.exports = deleteAccount;