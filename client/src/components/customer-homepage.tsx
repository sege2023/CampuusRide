import React from "react";
import styles from "../styles/customer-homepage.module.css"
import { CalendarClock, CarFront,CircleUserRound,Home } from "lucide-react";
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
      <div className={styles.footer}>
        <div>
        <Home/>
        <p>Home</p>
        </div>
        <div><CalendarClock/> 
        <p>Rides</p>
        </div>
        <div>
        <CircleUserRound/>
        <p>User</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
