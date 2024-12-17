import express from 'express';
import Tempuser from '../models/account-verification.model.mjs';
import { sendVerificationEmail } from '../../utils/email.util.mjs';
const resend_router = express.Router();

resend_router.post("/api/resend-code", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the existing temporary user
    const existingUser = await Tempuser.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ 
        error: "No pending verification found for this email" 
      });
      return;
    }

    // Generate a new verification code
    const newVerificationCode = Math.floor(10000 + Math.random() * 90000).toString();

    // Update the existing temporary user with new verification details
    existingUser.verificationCode = newVerificationCode;
    existingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    await existingUser.save();

    // Send new verification email
    await sendVerificationEmail(email, newVerificationCode);

    res.status(200).json({ 
      message: "New verification code sent successfully" 
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ 
      error: "Failed to resend verification code",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { resend_router };