import React from "react";
import styles from "../styles/customer-homepage.module.css"

const CustomerHome: React.FC = () => {
  return (
    <div className={styles.home_container}>
      <header className="header">
        <div className={styles.balance}>
          <p>Card Balance</p>
          <h2>₹ 240,000</h2>
          <button className={styles.topup_btn}>Top up</button>
        </div>
        <div className="profile">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </header>

      <main className={styles.main}>
        <h3>All Transport</h3>
        <div className={styles.transportoptions}>
          <div className={styles.option}>Shuttle Bus</div>
          <div className={styles.option}>Train</div>
          <div className={styles.option}>Truck</div>
          <div className={styles.option}>Taxi</div>
        </div>
        <h3>History</h3>
        <div className={styles.history}>
          <div className={styles.historyitem}>
            <p>Bus</p>
            <p>₹ 4,500</p>
          </div>
          <div className={styles.historyitem}>
            <p>Train</p>
            <p>₹ 4,250</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="nav-icon">🏠</div>
        <div className="nav-icon">🚌</div>
        <div className="nav-icon">📜</div>
        <div className="nav-icon">⚙️</div>
      </footer>
    </div>
  );
};

export default CustomerHome;
