import React from "react";
import styles from "../styles/customer-homepage.module.css"
import { CarFront,Moon, Sun, Sunset } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CustomerHome: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/booking')
  }
  return (
    // <h1>me</h1>
    <div className={styles.container}>
      <h3>Hi </h3>
      <div onClick = {handleClick} className={styles.book}>
        <p>Book Ride</p>
        <div className={styles.font}>
          <CarFront size={40} />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default CustomerHome;
