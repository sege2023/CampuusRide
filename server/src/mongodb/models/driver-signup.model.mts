// import mongooose from 'mongoose'
// // import { router as driversignupRouter } from '../routes/driver-signup.router.mjs';

// // const studentSchema = new mongooose.Schema
// const DriverSignupSchema= new mongooose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     plateNumber: { type: String, required: true },
//     carDescription: { type: String, required: true },
//     password: { type: String, required: true }
//   });
  
// export const Driver = mongooose.model('Drivers', DriverSignupSchema);

import mongoose, { InferSchemaType } from "mongoose";
import baseUserSchema from "./base-signup.model.mjs";
const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ["driver"], required: true }, // Differentiate user types
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  plateNumber: { type: String, required: true, unique:true},
  carDescription: { type: String, required: true },
});

// interface DriverUserDocument extends mongoose.Document {
//     name:string;
//     email: string;
//     phoneNumber: string;
//     password: string;
//     userType:"driver"
//     // verificationCode: string;
//     // expiresAt: Date;
//   }
type Driver = InferSchemaType<typeof driverSchema>

const Drivermodel = mongoose.model<Driver>("Drivers", driverSchema, "drivers_records");
export default Drivermodel