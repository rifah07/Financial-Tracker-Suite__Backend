const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const RefreshToken = require("../models/refreshToken"); // adjust path if needed

const auth = async (req, res, next) => {
  try {
    let accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) throw new Error("Access token missing");

    try {
      const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);
      req.user = jwt_payload;
      return next();
    } catch (err) {
      if (err.name !== 'TokenExpiredError') {
        throw new Error("Invalid access token");
      }

      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error("Refresh token missing");

      const tokenInDb = await RefreshToken.findOne({ token: refreshToken });
      if (!tokenInDb) throw new Error("Refresh token invalid or expired");

      const refreshPayload = jsonwebtoken.verify(refreshToken, process.env.jwt_salt);

      const newAccessToken = jsonwebtoken.sign(
        { id: refreshPayload.id },
        process.env.jwt_salt,
        { expiresIn: "15m" }
      );

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      req.user = refreshPayload;
      return next();
    }
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: e.message || "Unauthorized",
    });
  }
};

module.exports = auth;