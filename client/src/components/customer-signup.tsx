import { useState } from "react";
import styles from '../styles/customer-signup.module.css'
import { useNavigate } from "react-router-dom";

interface CustomerSignupFormData {
    name: string;
    email: string;
    phoneNumber: string;
    matricNumber: string;
    password: string;
    confirmPassword: string;
    userType: "customer" | "driver";
}    


const Customer_ui = () =>{

    const [formData, setFormData] = useState<CustomerSignupFormData>({
        name: "",
        email: "",
        phoneNumber: "",
        matricNumber: "",
        password: "",
        confirmPassword: "",
        userType: "customer"
      });
      
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        matricNumber: "",
        confirmPassword: "",
      });
    const navigate = useNavigate()

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    // const isAlphanumeric = (str: string) => /^[a-zA-Z0-9]+$/.test(str);

    const validateField = (name: string, value: string) => {
        let error = "";
      
        if (name === "email" && !isValidEmail(value)) {
          error = "Please enter a valid email address.";
        }
        
        if (name === "phoneNumber" && (value.length !== 11 || !/^\d+$/.test(value))) {
          error = "Phone number must be exactly 11 digits.";
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
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasErrors = false;
        Object.keys(formData).forEach((field) => {
        validateField(field, formData[field as keyof typeof formData]);
        if (errors[field as keyof typeof errors]) hasErrors = true;
        });

        if (hasErrors) {
          console.log("Form has validation errors.")
          return;}

        try {
          const response = await fetch("/api/register", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  ...formData
                  // userType: "customer"
              }),
          });
          console.log('Response status:', response.status); 
          const data = await response.json();
          // const data = await response.json()

         if (response.ok) {
          navigate("/account-verification", { 
            state: { email: data.email }
          });
          }
          else{
              setErrors(data.error || "Registration failed");
          // Assuming you have some way to display errors, like:
          // setShowError(true); 
          }

          // Registration successful
          

      } catch (error) {
          setErrors(prev => ({
              ...prev,
              submit: error instanceof Error ? error.message : "Error occured during Registration"
          }));
      } 
        
        
        navigate("/account-verification");
    
        // Proceed to send the data to the backend
        console.log("Customer Signup Data:", formData);
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
            {errors.name && <span className={styles.error}>{errors.name}</span>}
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
            {errors.email && <p className={styles.error}>{errors.email}</p>}
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
            {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
        </div>

        <div>
            <label>Matric Number:</label>
            <input
            type="text"
            name="matricNumber"
            value={formData.matricNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.phoneNumber && <span className={styles.error}>{errors.matricNumber}</span>}
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

        <button onClick={handleSubmit} type="submit">Sign Up</button>
    </form>
    )

}
export default Customer_ui