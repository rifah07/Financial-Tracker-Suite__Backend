const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "This email does not exist";
  if (!new_password) throw "Please enter a new password";
  if (!reset_code) throw "Reset code is required to update password";
  if (new_password.length < 5)
    throw "Password must be at least 5 characters long";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match";
  const hashedPassword = await bcrypt.hash(new_password, 12);
  getUserWithResetCode.reset_code = null;
  await getUserWithResetCode.save();

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      //reset_code:""
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Password updated successfully!!",
  });
};

module.exports = resetPassword;