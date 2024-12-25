import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  await transporter.sendMail({
    from: "CampusRide <no-reply@Campusride.com>",
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  });
};
export const generate_verification_code = () =>{
  return Math.floor(10000 + Math.random() * 90000).toString();
}