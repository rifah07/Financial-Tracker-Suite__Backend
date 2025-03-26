const mongoose = require("mongoose");

const forgotPassword = (req,res) => {

    const usersModel = mongoose.model("users");

    res.status(200).json({
        status: "Reset Password successfull"
    })


}

module.exports = forgotPassword;