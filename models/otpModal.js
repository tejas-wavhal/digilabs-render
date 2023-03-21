const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    expires: 180, // auto-delete document after 60s * 3 = 3 mins
    default: Date.now
  }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
