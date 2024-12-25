import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Drivermodel from "../models/driver-signup.model.mjs";
import Customermodel from "../models/customer-signup.model.mjs";


const login_router = Router();

login_router.post("/login", async (req, res) => {
  const { emailOrMatric, password } = req.body;

  try {
    // Check both drivers and students
        // const user =
        // (await Drivermodel.findOne({ email: emailOrMatric })) ||
        // (await Customermodel.findOne({ matricNumber: emailOrMatric }));
        if (!emailOrMatric || !password) {
          res.status(400).json({ 
            success: false, 
            message: 'Email/Matric number and password are required' 
          });
          return;
        }
        let user = null
        const isEmail = emailOrMatric.includes('@');
        if (isEmail) {
          // Email login - check both models in parallel
          const [driver, customer] = await Promise.all([
            Drivermodel.findOne({ email: emailOrMatric.toLowerCase() }),
            Customermodel.findOne({ email: emailOrMatric.toLowerCase() })
          ]);

          if (driver && customer) {
            res.status(409).json({succes:false, message: "Account conflicted "})
            return;
          }
          user = driver || customer
        }
        else{
          if (!/^\d+$/.test(emailOrMatric)) {
            res.status(400).json({
              success: false,
              message: "Matric number must contain only digits"
            });
            return;
          }
          
          user = await Customermodel.findOne({ matricNumber: emailOrMatric });
        }
        if (!user) {
        res.status(401).json({ success: false, message: "User not found." });
        return;
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        res.status(401).json({ success: false, message: "Invalid credentials." });
        return;
        }

        if (!process.env.JWT_SECRET) {
          res.status(500).json({ 
            success: false, 
            message: "Server configuration error" 
          });
          return;
        }

        const token = jwt.sign(
          { 
            id: user._id,
            role: user instanceof Drivermodel ? 'driver' : 'customer',
            email: user.email,
            matricNumber: user instanceof Customermodel ? user.matricNumber : undefined
          },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );

        res.json({
        success: true,
        token,
        role: user instanceof Drivermodel ? "driver" : "customer",
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default login_router;