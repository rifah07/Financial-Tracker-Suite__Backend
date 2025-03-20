const userDashboard = (req, res) => {
  console.log(req.user);
  res.status(200).json({
    status: "Successfull",
    message: "Assalamu Alaikum from User Dashboard",
  });
};

module.exports = userDashboard;