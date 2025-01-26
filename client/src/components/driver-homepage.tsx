import { useNavigate } from 'react-router-dom'
import styles from '../styles/driver-homepage.module.css'
const DriverHome = () =>{
    const navigate = useNavigate()
    const handleClick = ()=>{
       navigate('/availabilty') 
    }
    return(
            <div className={styles.container}>
                <button onClick={handleClick}>Make your self available</button>
            </div>
    )
}
export default DriverHome