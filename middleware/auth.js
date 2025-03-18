const auth = (req, res, next) => {
  console.log("Assalamu alaikum from Middleware module");

  throw "Can't do this now";
  next();
};

module.exports = auth;