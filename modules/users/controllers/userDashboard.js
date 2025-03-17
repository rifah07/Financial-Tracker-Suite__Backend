const userDashboard = (req, res) => {
  res.status(200).json({
    status: "Successfull",
    message: "Assalamu Alaikum from User Dashboard",
  });
};

module.exports = userDashboard;