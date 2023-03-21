const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,  //to work well gmail
    port: process.env.SMPT_PORT,  //to work well gmail
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  let mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is ${otp}. It will expire in 3 minute.`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
