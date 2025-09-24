const nodemailer = require("nodemailer");

async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or SMTP details
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"support@ezbuy.com"`,
    to: email,
    subject: "Your OTP Code",
    text: `
    Thanks For Registering on EzBuy.
    Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
}

module.exports = sendOTPEmail;
