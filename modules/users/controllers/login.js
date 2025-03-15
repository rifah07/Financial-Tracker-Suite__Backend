const mongoose = require("mongoose");
const login = async (req, res) => {

    const usersModel = mongoose.model("users");


    const { email, password } = req.body;

    const getUser = await usersModel.findOne({
        email: email

    })

    if (!getUser) throw "This email does not exist";

    res.status(200).json({
        status: "Success",
        message: "Login Successful"
    })
}

module.exports = login;