import mongoose, { InferSchemaType } from "mongoose";
const customerSchema = new mongoose.Schema({
    // ...baseUserSchema.obj, // Only base fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ["driver", "customer"], required: true }, // Differentiate user types
  password: { type: String, required: true },
  matricNumber:{type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  });

// interface CustomerUserDocument extends mongoose.Document {
//     name:string;
//     email: string;
//     phoneNumber: string;
//     password: string;
//     userType: "customer"
//     // verificationCode: string;
//     // expiresAt: Date;
// }
type Customer = InferSchemaType<typeof customerSchema>
const Customermodel = mongoose.model<Customer>("Customers", customerSchema, "customers_records");
export default Customermodel