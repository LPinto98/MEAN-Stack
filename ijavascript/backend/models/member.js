const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  name: { type: String, required: true },
  job_role: { type: String, required: true },
  imagePath: { type: String, required: true }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Member", memberSchema);
