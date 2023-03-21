const Otp = require('../models/otpModal.js');
const sendOTP = require('../utils/sendOtp.js');

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP

    // store OTP in the database
    const newOtp = await new Otp({ otp, email });
    await newOtp.save();

    // send OTP to user's email
    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    // check if OTP exists in the database and is not expired
    const foundOtp = await Otp.findOne({ otp });

    if (!foundOtp) {
      return res.status(400).json({ message: 'Invalid OTP or has been Expired' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};