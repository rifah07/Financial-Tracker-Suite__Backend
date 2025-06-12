const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "Please enter a new password";
  if (!reset_code) throw "Reset code is required to update password";
  if (new_password.length < 5) throw "Password must be at least 5 characters long";

  const user = await usersModel.findOne({ email, reset_code });
  if (!user) throw "Reset code does not match or email is incorrect";

  // Update password
  user.password = await bcrypt.hash(new_password, 12);
  user.reset_code = null;
  await user.save();

  // Send confirmation email
  await emailManager(
    email,
    "Your password has been reset successfully. You can now log in with your new password.",
    "Congratulations! Your password has been reset in Financial Tracker Suite. <br>If this wasn't you, please contact support immediately.",
    "Password Reset Successful"
  );

  res.status(200).json({
    status: "Success",
    message: "Password updated successfully!",
  });
};

module.exports = resetPassword;