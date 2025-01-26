import { useNavigate } from "react-router-dom";
import styles from '../styles/landing.module.css'

const Landing = () =>{
    const navigate = useNavigate();

    // Function to handle button clicks
    const handleNavigate = (path: string): void => {
        navigate(path);
    };
    return(
        <div className={styles.wild}>
            <h1>Welcome <br /><span>to</span> <span>Campus Ride</span></h1>
            <button className={styles.button} onClick={() => handleNavigate('/driver-signup')}>
                Sign Up as Driver
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/customer-signup')}>
                Sign Up as Customer
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/login')}>
                Login
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/account-verification')}>
                verify
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/customer-homepage')}>
                Customer Home
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/driver-homepage')}>
                Driver Home
            </button>
        </div>
    )
}
export default Landing