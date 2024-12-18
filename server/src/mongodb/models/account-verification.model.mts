import mongoose, { mongo } from "mongoose";
import baseUserSchema from "./base-signup.model.mjs";
import bcrypt from 'bcrypt'

const TempUserSchema = new mongoose.Schema(
    {name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, enum: ["driver", "customer"], required: true }, // Differentiate user types
    password: { type: String, required: true },
    matricNumber:{type: String, required:true, unique: true},
    plateNumber:{type: String, required: true, unique: true},
    carDescription:{type: String, required:true},
    createdAt: { type: Date, default: Date.now },
    verificationCode: { type: String, required: true }, // Explicitly defined
    expiresAt: { type: Date, required: true },
    },
    {strict:false}
    
);

interface TempUserDocument extends mongoose.Document {
    name:string;
    email: string;
    phoneNumber: string;
    password: string;
    userType:"driver" | "customer"
    plateNumber: string;
    carDescription: string;
    matricNumber:string;
    verificationCode: string;
    expiresAt: Date;
  }

TempUserSchema.pre<TempUserDocument>("save", async function (next) {
    // If password is not modified, exit
    if (!this.isModified("password")) return next();
    
    // Ensure password exists
    if (!this.password) return next(new Error("Password is required"));
  
    try {
      // Use a fixed salt round instead of manually generating salt
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error as Error);
    }
  });
  

const Tempuser = mongoose.model<TempUserDocument>("temp_user", TempUserSchema)
export default Tempuser