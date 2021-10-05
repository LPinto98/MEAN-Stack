const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  userid: { type: String, required: true },
  amount: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);
