import styles from '../styles/booking.module.css'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// flatpickr("#calendar-input", {
//   dateFormat: "Y-m-d",
// });

const Booking =()=>{
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return(
        <div className={styles.container}>
           <div  className={styles.bookbox}>
                <div className={styles.locations}>
                    {/* <h1>yokuso</h1> */}
                    <label htmlFor="location">From:</label>
                    <select name="location" id="">
                        <option value="" disabled selected>Select Originating Location</option>
                        <option value="locationA">location1</option>
                        <option value="locationB">location2</option>
                        <option value="locationC">location3</option>
                    </select>
                </div>
                <div className={styles.locations}>
                    <label htmlFor="">To</label>
                    <select name="destination" id="">
                        <option value="" disabled selected>Select Destination Location</option>
                        <option value="locationA">destination1</option>
                        <option value="locationB">destination2</option>
                        <option value="locationC">destination3</option>
                    </select>
                </div>
                <div>
                    {/* <select name="date" id="calender-input">Select Date</select> */}
                    
                </div>
                <div className={styles.locations}>
                    <label>Select a date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        minDate={new Date()} // Restrict past dates
                        isClearable // Allow clearing the date
                    />
                </div>
                <button className={styles.button}>Find Driver</button>
                <div>

                </div>
           </div>
        </div>
    )
}
export default Booking