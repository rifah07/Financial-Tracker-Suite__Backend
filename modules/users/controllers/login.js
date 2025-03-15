const mongoose = require("mongoose");
const login = (req, res) => {

    const usersModel = mongoose.model("users");


    const { emain, password } = req.body;

    res.status(200).json({
        status: "Success",
        message: "Login Successful"
    })
}

module.exports = login;