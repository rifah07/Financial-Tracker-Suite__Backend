const mongoose = require("mongoose");

const deleteAccount = async (req, res) => {
    const usersModel = mongoose.model("users");

    const {user_id} = req.params;

    if (!user_id) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user_id);
    const deletedUser = await usersModel.deleteOne({ _id: user_id });

    if (deletedUser.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    res.status(200).json({
      status: "Success",
      message: "Account deleted successfully",
    });
  }

module.exports = deleteAccount;