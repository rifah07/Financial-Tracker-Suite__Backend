const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount:{
      type: Number,
      required: true,
    },
    transaction_type:{
      type: String,
      required: true,
      enum: ["income", "expense"],
      validate: {
        validator: function(v) {
          return ["income", "expense"].includes(v.toLowerCase());
        },
        message: 'Transaction type must be income or expense'
      },
      // Convert input to lowercase before saving
      set: function(v) {
        return v.toLowerCase();
      }
    },

    remarks:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsModel;