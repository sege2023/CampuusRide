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

import mongoose from "mongoose";
import baseUserSchema from "./base-signup.model.mjs";
const driverSchema = new mongoose.Schema({
  ...baseUserSchema.obj, // Include fields from the base schema
  plateNumber: { type: String, required: true },
  carDescription: { type: String, required: true },
});

export const Driver = mongoose.model("Driver", driverSchema, "drivers_records");