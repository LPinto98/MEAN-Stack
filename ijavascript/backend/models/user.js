const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  last_login: { type: String, required: true },
  balance: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
