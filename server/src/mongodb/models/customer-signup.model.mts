import mongoose from "mongoose";
import baseUserSchema from "./base-signup.model.mjs";
const customerSchema = new mongoose.Schema({
    ...baseUserSchema.obj, // Only base fields
  });
  
export const Customer = mongoose.model("Customer", customerSchema, "customers_records");