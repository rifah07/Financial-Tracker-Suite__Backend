const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
    {
        token: { 
            type: String, 
            required: true,
            unique: true // This creates the index automatically
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users", 
            required: true,
            index: true // This creates the index automatically
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            expires: 0 // This creates the TTL index automatically
        },
        isActive: {
            type: Boolean,
            default: true
        },
        deviceInfo: {
            userAgent: String,
            ipAddress: String
        }
    },
    { 
        timestamps: true 
    }
);

// Only add additional indexes that aren't automatically created

// Method to check if token is expired
refreshTokenSchema.methods.isExpired = function() {
    return this.expiresAt < new Date();
};

// Static method to clean up expired tokens
refreshTokenSchema.statics.cleanupExpired = function() {
    return this.deleteMany({ expiresAt: { $lt: new Date() } });
};

// Static method to revoke all tokens for a user
refreshTokenSchema.statics.revokeAllForUser = function(userId) {
    return this.updateMany(
        { userId: userId }, 
        { isActive: false }
    );
};

module.exports = mongoose.model("refresh_tokens", refreshTokenSchema);