const User = require("../models/user");
const bcrypt = require("bcrypt"); // for password hashing
const crypto = require("crypto"); // for generating random token
const nodemailer = require("nodemailer");

const saltRounds = 10;

function generateRandomToken() {
  return crypto.randomBytes(16).toString("hex");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: "clinifowl@gmail.com",
    pass: "nczl gujs eeok knyo",
  },
});

async function signup(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a secure token with appropriate expiration
    const token = generateRandomToken();
    const tokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = new User({
      email,
      password: hashedPassword,
      token,
      tokenExpires,
    });

    await user.save();

    // Construct a secure verification link
    const verificationLink = `http://localhost:8080/verification?token=${token}`;

    // Send email using a reliable email service (replace with your implementation)
    const mailOptions = {
      from: "CliniFowl",
      to: email,
      subject: "Email Verification",
      text: `Click on the following link to verify your email: ${verificationLink}`,
    };

    // Handle email sending errors gracefully
    await transporter.sendMail(mailOptions);

    res.json({ message: "Verification email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { signup };
