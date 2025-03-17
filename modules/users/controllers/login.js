const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  const confirmPassword = await bcrypt.compare(password, getUser.password);

  if (!confirmPassword) throw "Email and Password do not match";

  //success response

  res.status(200).json({
    status: "Success",
    message: "Login Successful",
  });
};

module.exports = login;