import { useState } from "react"
import { useNavigate } from "react-router-dom";
interface LoginResult {
    success: boolean;
    role?: "driver" | "customer";
    token?: string;
    message?: string;
  }

const Login:React.FC = () =>{

    const[emailormatric, setemailormatirc] = useState("")
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        setError("");

        try {
            const response  = await fetch("/api/login",{
                method:"POST",
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    emailormatric,
                    password, 
                    rememberMe
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed.");
              }
          
              const result: LoginResult = await response.json();
              if (result.success) {
                if (rememberMe && result.token) {
                    localStorage.setItem("token", result.token);
                }
                else if (result.token) {
                    sessionStorage.setItem("token", result.token)
                }

                if (result.role === "driver") {
                    
                }
                else if (result.role === "customer") {
                    
                }
                else{
                    
                }
              }
        } catch (error) {
            
        }
    }

    return(
        <h1>hime</h1>
    )
}
export default Login