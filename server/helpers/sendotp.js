const nodemailer = require("nodemailer");

async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or SMTP details
    auth: {
      user: "pkirtan9988@gmail.com",
      pass: "tocw enkg khae vxtz",
    },
  });

  await transporter.sendMail({
    from: `"Your App" <pkirtan9988@gmail.com>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
}

module.exports = sendOTPEmail;
