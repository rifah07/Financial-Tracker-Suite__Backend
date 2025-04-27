const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const RefreshToken = require("../../../models/refreshToken");


const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  const confirmPassword = await bcrypt.compare(password, getUser.password);

  if (!confirmPassword) throw "Email and Password do not match";

  const accessToken = await jwtManager(getUser);

  // Generate Refresh Token
  const refreshToken = jsonwebtoken.sign(
    { id: getUser._id },
    process.env.jwt_salt,
    { expiresIn: "7d" }
  );

  // Save Refresh Token to DB
  await RefreshToken.create({
    token: refreshToken,
    userId: getUser._id,
  });

  // Set both tokens in cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });


  //success response

  res.status(200).json({
    status: "Success",
    message: "Login Successful",
    accessToken: accessToken,
  });
};

module.exports = login;