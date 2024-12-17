// import { useState } from "react"

import { useState } from "react";
import styles from "../styles/account-verification.module.css";

interface AccountVerificationProps{
  email_front: string;
  onVerificationSuccess?:() => void
}
const AccountVerification:React.FC<AccountVerificationProps> = (

  email_front,
  // onVerificationSuccess

) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer,setTimer] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { // Only allow digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus the next input
      if (value && index < 4) document.getElementById(`input-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join("");
    // Validate the code with the backend
    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email:email_front, verificationCode:enteredCode }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage("Verification successful!");
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
    setMessage("A new code has been sent to your email.");
    setIsResending(false);
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
      {!isResending && <button onClick={handleResend}>Resend Code</button>}
      {/* <p>this is not going to be there it is going to be an automatic routing when they click on the signup button </p> */}
    </div>
  );
};

export default AccountVerification;
