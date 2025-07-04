const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  otp: { type: Number, required: true },
  is_expired: { type: Boolean,default:false},
  is_used: { type: Boolean, default: false},
  status: { type: Boolean ,default:true},
  time:{ type: String, required: true },
  user_id:{ type: String, required: true },
});

module.exports = mongoose.model("Otp", userSchema);
