const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res, next) => {

  try {
    const usersModel = mongoose.model("users");
    const { email } = req.body;

    if (!email) throw new Error("Your E-mail must be provided");

    const getUser = await usersModel.findOne({ email });

    if (!getUser) throw new Error("This email address does not exist in the system!");

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    getUser.reset_code = resetCode;
    await getUser.save(); // use save for better validation and hook compatibility

    await emailManager(
      email,
      `You have requested to reset password. Here is your reset code ${resetCode}`,
      `Your password reset code is ${resetCode}`,
      "Password Reset Code for Financial Tracker Suite"
    );

    res.status(200).json({
      status: "Reset code sent to email successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = forgotPassword;