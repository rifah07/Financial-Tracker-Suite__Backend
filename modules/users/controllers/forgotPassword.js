const mongoose = require("mongoose");
const nodemailer= require("nodemailer");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Your E-mail must be provided";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email address does not exist in the system!";

  const resetCode = Math.floor(10000 + Math.random() * 90000); //this function creates 5 random digits in numbers

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );


  //send email
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "12ad86218f7fa0",
        pass: "2af3ff3c8e638f",
      },
    });
  
    await transport.sendMail({
      to: email,
      from: "info@financialtrackersuite.com", // the domain of production server
      text: "You have requested to reset password. Here is your reset code "+ resetCode,
      html: "Your password reset code is "+ resetCode,
      subject: "Password Reset Code for Financial Tracker Suite"
    });
  

  res.status(200).json({
    status: "Reset code sent to email successfully",
  });
};

module.exports = forgotPassword;