import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { User } from "../db.js";

export const recoverPw = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a password reset token (expires in 1 hour)
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET ?? "secret",
      {
        expiresIn: "1h",
      }
    );

    // Store the token in the database (optional, can be used to check token later)
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send the email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: '"FULLSTACK.team" <' + process.env.MAIL_USER + ">",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

export const resetPw = asyncWrapper(async (req, res, next) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (
      !user ||
      user.passwordResetToken !== token ||
      user.passwordResetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
});
