const mongoose = require("mongoose");

const forgotPassword = async (req,res) => {

    const usersModel = mongoose.model("users");

    const {email}= req.body;

    if(!email) throw "Your E-mail must be provided";

    const getUser = await usersModel.findOne({
        email: email
    })

    if(!getUser) throw "This email address does not exist in the system!";

    res.status(200).json({
        status: "Reset code sent to email successfully"
    })


}

module.exports = forgotPassword;