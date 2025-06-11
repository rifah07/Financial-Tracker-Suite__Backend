const mongoose = require("mongoose");

const logout = async (req, res) => {
  try {
    const RefreshToken = require("../../../models/refreshToken");
    
    // Get refresh token from cookies 
    const refreshToken = req.cookies.refreshToken;
    
    // Delete refresh token from DB if it exists
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    
    // For React: Also delete all refresh tokens for this user as fallback
    // This ensures logout works even if cookie wasn't accessible
    if (req.user && req.user._id) { // Changed from id to _id to match your login code
      await RefreshToken.deleteMany({ userId: req.user._id });
    }

    // Clear cookies
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      status: "Success",
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message || error,
    });
  }
};

module.exports = logout;