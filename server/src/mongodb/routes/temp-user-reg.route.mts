import { Router, Request, Response} from "express";
import Tempuser from "../models/account-verification.model.mjs";
import { sendVerificationEmail, generate_verification_code } from "../../utils/email.util.mjs";
// const register_router = express.Router();
const register_router = Router()
// register_router.use(express.json());

register_router.post("/register", async (req:Request, res:Response):Promise<any> => { 
    const { 
      name, 
      email, 
      phoneNumber, 
      userType, 
      password
    } = req.body;
  // this mf might come back to bite me in the ass
    try {
      // Validate required fields
      if (!name || !email || !phoneNumber || !userType || !password) {
        return res.status(400).json({ 
          error: "All fields are required" 
        });
      }
  
      // Generate verification code
      const verificationCode = generate_verification_code();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);    
      
      // Define base user data interface
      interface BaseUserData {
        name: string;
        email: string;
        phoneNumber: string;
        userType: string;
        password: string;
        verificationCode: string;
        expiresAt: Date;
        isVerified: boolean;
      }
  
      // Define driver-specific interface
      // interface DriverUserData extends BaseUserData {
      //   plateNumber: string;
      //   carDescription: string;
      // }
  
      // Prepare base user data
      const baseUserData: BaseUserData = { 
        name, 
        email, 
        phoneNumber, 
        userType, 
        password, 
        verificationCode, 
        expiresAt,
        isVerified: false
      };
  
      // Get the appropriate MongoDB collection based on user type
    //   let collection;
      if (userType === "driver") {
        // Validate driver-specific fields
        const { plateNumber, carDescription } = req.body;
        if (!plateNumber || !carDescription) {
          return res.status(400).json({ 
            error: "Plate number and car description are required for drivers" 
          });
        }
  
        const tempUser = new Tempuser({
            name, 
            email, 
            phoneNumber, 
            userType, 
            password, 
            verificationCode,
            expiresAt,
            // Add any additional driver-specific fields if needed
            ...(userType === 'driver' ? { plateNumber, carDescription } : {})
          });
          
          await tempUser.save();

      } else if (userType === "customer") {
        // Insert into customers temporary collection
        const tempUser = new Tempuser({
            name, 
            email, 
            phoneNumber, 
            userType, 
            password, 
            verificationCode,
            expiresAt,
          });
          await tempUser.save();
          
      } else {
        return res.status(400).json({ 
          error: "Invalid user type" 
        });
      }
  
      // Send verification code (via email or SMS)
      await sendVerificationEmail(email,verificationCode);
  
      res.status(201).json({ 
        message: "User registered. Please check your email for verification code.",
        email 
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ 
        error: "Registration failed"
        // details: error.message 
      });
    }
});
export default register_router;
// export const register_router = (...) => ...;