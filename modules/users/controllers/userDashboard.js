const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password"); //name balance , all except password

  if (!getUser) throw "User not found";

  const transactions = await transactionsModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5); //for desending sort oredr -createdAt, for assending createdAt

  res.status(200).json({
    status: "Success",
    data: getUser,
    transactions,
  });
};

module.exports = userDashboard;