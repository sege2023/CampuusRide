import mongooose from 'mongoose'
// import { router as driversignupRouter } from '../routes/driver-signup.router.mjs';

// const studentSchema = new mongooose.Schema
const DriverSignupSchema= new mongooose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    plateNumber: { type: String, required: true },
    carDescription: { type: String, required: true },
    password: { type: String, required: true }
  });
  
export const Driver = mongooose.model('Drivers', DriverSignupSchema);