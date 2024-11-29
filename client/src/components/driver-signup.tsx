import { useState } from "react";
import styles from '../styles/driver-signup.module.css'
import { useNavigate } from "react-router-dom";

interface DriverSignupFormData {
    name: string;
    email: string;
    phoneNumber: string;
    plateNumber: string;
    carDescription: string;
    password: string;
    confirmPassword: string;
}    
const Driver = () =>{

    const [formData, setFormData] = useState<DriverSignupFormData>({
        name: "",
        email: "",
        phoneNumber: "",
        plateNumber: "",
        carDescription: "",
        password: "",
        confirmPassword: "",
      });
      
    const [error, setError]  = useState<string | null>(null)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const isAlphanumeric = (str: string) => /^[a-zA-Z0-9]+$/.test(str);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return; // Stop submission
        }

        if (formData.phoneNumber.length !== 11 || !/^\d+$/.test(formData.phoneNumber)) {
            setError("Phone number must be exactly 11 digits.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!isAlphanumeric(formData.plateNumber)) {
            setError("Plate number must be alphanumeric (letters and numbers only).");
            return;
        }

        setError(null); // Clear the error if no issues
        // alert("Sign U!");
        navigate("/account-verification");
    
        // Proceed to send the data to the backend
        console.log("Driver Signup Data:", formData);
      };
    return(
        <div className={styles.container}>
            <h2>Signup as a Driver</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className = {styles.formspace} onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Enter your name" />

                <input 
                type="email" 
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required/>

                <input 
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required />

                <input
                type="text"
                name="plateNumber"
                placeholder="Enter plate number e.g ABC-123DE"
                value={formData.plateNumber}
                onChange={handleChange}
                required />

                <input 
                type="text"
                name="carDescription"
                placeholder="Brief car description e.g black corolla"
                value={formData.carDescription}
                onChange={handleChange}
                required/>

                <input 
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required/>

                <input 
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required/>

            <button type="submit">Sign Up</button>
            </form>
        </div>
    )

}
export default Driver