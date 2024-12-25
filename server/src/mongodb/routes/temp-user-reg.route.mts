import { Router, Request, Response} from "express";
import Tempuser from "../models/account-verification.model.mjs";
import { sendVerificationEmail, generate_verification_code } from "../../utils/email.util.mjs";
import cors from 'cors'
import { error } from "console";
// const register_router = express.Router();
const register_router = Router()
// register_router.use(express.json());
interface RegisterRequestBody {
  name: string;
  email: string;
  phoneNumber: string;
  userType: 'driver' | 'customer';
  password: string;
  plateNumber?: string;
  carDescription?: string;
  matricNumber?: string;
}

interface RegisterResponse {
  message: string;
  email: string;
}

interface ErrorResponse {
  error: string;
}

register_router.use(cors())

register_router.post("/register", async (req: Request<{}, {}, RegisterRequestBody>,
  res: Response<RegisterResponse | ErrorResponse>):Promise<void> => { 
    const { 
      name, 
      email, 
      phoneNumber, 
      userType, 
      password
    } = req.body;

    try {
      // Validate required fields
      if (!name || !email || !phoneNumber || !userType || !password) {
        res.status(400).json({ 
          error: "All fields are required" 
        });
        return;
      }
  
      // Generate verification code
      const verificationCode = generate_verification_code();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);    
     
    //   let collection;
      if (userType === "driver") {
        // Validate driver-specific fields
        const { plateNumber, carDescription } = req.body;
        if (!plateNumber || !carDescription) {
          res.status(400).json({ 
            error: "Plate number and car description are required for drivers" 
          });
          return;
        }
  
        const tempUser = new Tempuser({
            name, 
            email, 
            phoneNumber, 
            userType, 
            password, 
            verificationCode,
            expiresAt,
            plateNumber,
            carDescription,
            // Add any additional driver-specific fields if needed
            // ...(userType === 'driver' ? { plateNumber, carDescription } : {})
          });
          
          await tempUser.save();

      } 
      
      else if (userType === "customer") {
        // Insert into customers temporary collection
        const{matricNumber} = req.body
        if (!matricNumber) {
          res.status(400).json({
            error: "Matric number is required for students"
          });
          return;
        }
        const tempUser = new Tempuser({
            name, 
            email, 
            phoneNumber, 
            userType, 
            password, 
            verificationCode,
            expiresAt,
            matricNumber,
            // ...(userType === 'customer' ? { matricNumber } : {})
          });
          await tempUser.save();
          
      } else {
        res.status(400).json({ 
          error: "Invalid user type" 
        });
        return;
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