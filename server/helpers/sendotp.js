const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

async function sendOTPEmail(email, otp) {
  console.log("=== Environment Check ===");
  console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
  console.log("GMAIL_CLIENT_ID length:", process.env.GMAIL_CLIENT_ID?.length);
  console.log(
    "GMAIL_CLIENT_ID preview:",
    process.env.GMAIL_CLIENT_ID?.substring(0, 20) + "..."
  );
  console.log(
    "GMAIL_CLIENT_SECRET length:",
    process.env.GMAIL_CLIENT_SECRET?.length
  );
  console.log(
    "GMAIL_CLIENT_SECRET preview:",
    process.env.GMAIL_CLIENT_SECRET?.substring(0, 10) + "..."
  );
  console.log(
    "GMAIL_REFRESH_TOKEN length:",
    process.env.GMAIL_REFRESH_TOKEN?.length
  );
  console.log(
    "GMAIL_REFRESH_TOKEN preview:",
    process.env.GMAIL_REFRESH_TOKEN?.substring(0, 10) + "..."
  );
  console.log("========================\n");
  try {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail({
      from: `"EzBuy Support" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h3>Thanks for registering on EzBuy</h3>
        <p>Your OTP is <strong>${otp}</strong></p>
        <p>It is valid for 5 minutes.</p>
      `,
    });

    console.log("OTP email sent to:", email);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
}

module.exports = sendOTPEmail;
