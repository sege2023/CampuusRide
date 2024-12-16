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
      
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        plateNumber: "",
        password: "",
        confirmPassword: "",
      });
    const navigate = useNavigate()

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const isAlphanumeric = (str: string) => /^[a-zA-Z0-9]+$/.test(str);

    const validateField = (name: string, value: string) => {
        let error = "";
      
        if (name === "email" && !isValidEmail(value)) {
          error = "Please enter a valid email address.";
        }
        
        if (name === "phoneNumber" && (value.length !== 11 || !/^\d+$/.test(value))) {
          error = "Phone number must be exactly 11 digits.";
        }
        
        if (name === "plateNumber" && !isAlphanumeric(value)) {
          error = "Plate number must be alphanumeric (letters and numbers only).";
        }
        
        if (name === "password" && value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        
        if (name === "confirmPassword" && value !== formData.password) {
          error = "Passwords do not match.";
        }
      
        // Update the specific field's error
        setErrors((prev) => ({ ...prev, [name]: error }));
      };
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value)
    }
   
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        // Validate field when the user leaves the input field
        validateField(name, value);
      };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let hasErrors = false;
        Object.keys(formData).forEach((field) => {
        validateField(field, formData[field as keyof typeof formData]);
        if (errors[field as keyof typeof errors]) hasErrors = true;
        });

        if (hasErrors) return;
        
        // Check if passwords match
        // if (formData.password !== formData.confirmPassword) {
        //   setError("Passwords do not match!");
        //   return; // Stop submission
        // }

        // if (formData.phoneNumber.length !== 11 || !/^\d+$/.test(formData.phoneNumber)) {
        //     setError("Phone number must be exactly 11 digits.");
        //     return;
        // }

        // if (!isValidEmail(formData.email)) {
        //     setError("Please enter a valid email address.");
        //     return;
        // }

        // if (!isAlphanumeric(formData.plateNumber)) {
        //     setError("Plate number must be alphanumeric (letters and numbers only).");
        //     return;
        // }

        // setError(null); // Clear the error if no issues
        // // alert("Sign U!");
        navigate("/account-verification");
    
        // Proceed to send the data to the backend
        console.log("Driver Signup Data:", formData);
      };
    return(
    <form className={styles.formbody} onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
            <label>Email:</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
            <label>Phone Number:</label>
            <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div>
            <label>Plate Number:</label>
            <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.plateNumber && <span className="error">{errors.plateNumber}</span>}
        </div>

        <div>
            <label>Car Description:</label>
            <input type="text"
            name="carDescription"
            placeholder="e.g black toyota camry"
            value={formData.carDescription}
            onChange={handleChange} />
        </div>

        <div>
            <label>Password:</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <div>
            <label>Confirm Password:</label>
            <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Sign Up</button>
    </form>
    )

}
export default Driver