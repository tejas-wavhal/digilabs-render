const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/otpControllers.js');


const router = express.Router();


// send otp  
router.route("/sendotp").post(sendOtp)

// verify otp
router.route("/verifyopt").post(verifyOtp)

module.exports = router;
