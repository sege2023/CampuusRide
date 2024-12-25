import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
interface LoginResult {
    success: boolean;
    role?: "driver" | "customer";
    token?: string;
    message?: string;
  }

const Login:React.FC = () =>{

    const[emailOrMatric, setEmailOrMatric] = useState("")
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
                    emailOrMatric,
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
                    navigate('/driver-homepage')
                }
                else if (result.role === "customer") {
                    navigate('customer-homepage')
                }
                else{
                    setError(result.message || "Invalid credentials. Please try again.");
                }
              }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    }

    return(
        // <h1>hime</h1>
        <div>
            <form action="" className={styles.forum}>
                <div>
                    <label htmlFor="emailOrMatric">Email or Matric No.</label>
                    <input
                        type="text"
                        id="emailOrMatric"
                        value={emailOrMatric}
                        onChange={(e) => setEmailOrMatric(e.target.value)}
                        placeholder="Enter email or matric number"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <span>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </span>
                {error && <div className="error-message">{error}</div>}
        
                <button onClick={handleSubmit} type="submit">Login</button>
            </form>
        </div>


    )
}
export default Login