import express from 'express'
const verify_router  = express.Router()
import Tempuser from '../models/account-verification.model.mjs'
import Drivermodel from '../models/driver-signup.model.mjs'
import Customermodel from '../models/customer-signup.model.mjs'
verify_router.post("/api/verify", async (req, res):Promise<void> => {
    const { email, verificationCode } = req.body;
  
    try {
      let user = await Tempuser.findOne({email, verificationCode})
      // Verify code and check expiration
      if (!user) {
        res.status(400).json({ error: "Invalid verification code" });
        return;
      }
  
      if (!user?.expiresAt || new Date(user.expiresAt) < new Date()) {
        res.status(400).json({ error: "Verification code expired" });
        return;

      }
      
      const userData = {
        name: user.name,
        email: user.email,
        userType: user.userType,
        phoneNumber: user.phoneNumber,
        isVerified: true
      };

      const finalUserData = user.userType === 'driver' 
    ? {
        ...userData,
        plateNumber: user.plateNumber,
        carDescription: user.carDescription,
      }
    : userData;

    
      const permanentCollection = await(
        user.userType === 'driver' 
        ? Drivermodel.create(finalUserData)
        : Customermodel.create(finalUserData)
      // console.log('Insertion result', permanentCollection)
      )
      
      // // Insert into permanent collection
      // await permanentCollection.create({
      //   ...user.toObject()
      //   // isVerified: true
      // });
  
      // Remove from temporary collection
      // await (user).deleteOne({ email });
      await Tempuser.findByIdAndDelete({email,verificationCode})
  
      res.status(200).json({ 
        message: "User verified successfully",
        userType: user.userType 
      });
  
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ 
        error: "Verification failed"
      });
    }
  });
  
export {verify_router}
