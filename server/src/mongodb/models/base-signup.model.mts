import mongoose, { Schema } from "mongoose";

const baseUserSchema = new Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ["driver", "customer"], required: true }, // Differentiate user types
  password: { type: String, required: true },
  // verificationCode: {type: String},
  // expiresAt: {type:Date},
  createdAt: { type: Date, default: Date.now },
});
export default baseUserSchema