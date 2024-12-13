import mongoose, { mongo } from "mongoose";
import baseUserSchema from "./base-signup.model.mjs";
const TempUserSchema = new mongoose.Schema(
    {...baseUserSchema.obj},
    {strict:false}
);
const Tempuser = mongoose.model("temp_user", TempUserSchema)
export default Tempuser