// import { useState } from "react"

import { useEffect, useState } from "react";
import styles from "../styles/account-verification.module.css";
import { useNavigate, useLocation } from "react-router-dom";

// interface AccountVerificationProps{
//   email_front: string;
//   onVerificationSuccess?:() => void
// }
const AccountVerification:React.FC = (

  // email_front,
  // onVerificationSuccess
) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer,setTimer] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const email_front = location.state?.email_front;

  useEffect(()=>{
    let countdown: NodeJS.Timeout;
    if (isResending) {
      setTimer(60); // Start 60s timer
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
  }, [isResending])

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { // Only allow digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus the next input
      if (value && index < 4) document.getElementById(`input-${index + 1}`)?.focus();
      if (!value && index > 0) {
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }
  };

  

  const handleSubmit = async () => {
    const enteredCode = code.join("");
    // Validate the code with the backend
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email:email_front, verificationCode:enteredCode }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage("Verification successful!");
      setTimeout(() => navigate("/landing"), 1000); // Automatically navigate after 1 second
    } else {
      setMessage("Invalid code. Please try again.");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    await fetch("/api/resend-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email:email_front }),
    });
    setMessage("A new verification code has been sent to your email.");
    setTimeout(() => setMessage(""), 5000); // Hide message after 5 seconds

    setTimeout(() => {
      setIsResending(false); // Allow resend after 60 seconds
    }, 60000);
  };

  return (
    <div className={styles.container}>
      <h2>Account Verification</h2>
      <div className={styles.codeContainer}>
        {code.map((num, idx) => (
          <input
            key={idx}
            id={`input-${idx}`}
            type="text"
            inputMode="numeric"  // Better for mobile numeric input
            pattern="[0-9]*"
            value={num}
            onChange={(e) => handleChange(idx, e.target.value)}
            maxLength={1}
            className={styles.codeInput}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Verify</button>
      {message && <p className={styles.message}>{message}</p>}
      {/* {!isResending && <button onClick={handleResend}>Resend Code</button>} */}
      <button onClick={handleResend} disabled={isResending} className={styles.resendButton}>
        {isResending ? `Resend Code in ${timer}s` : "Resend Code"}
      </button>
    </div>
  );
};

export default AccountVerification;
