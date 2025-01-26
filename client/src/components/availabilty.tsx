import styles from '../styles/availability.module.css'
import { useState } from 'react';
// import {Card, CardHeader} from '@'
// import {Button} from "@radix-ui/react-slot"
// import { Button } from './ui/button';

interface Route {
    id: number;
    origination: string;
    destination: string;
    timeSlot: string;
    date: Date | null;
  }

const DriverAvailabilityForm = () => {
  const [routes, setRoutes] = useState([{
    id: 1,
    origination: '',
    destination: '',
    timeSlot: '',
    date: null
  }]);

  // Campus locations - in real app, fetch from API/database
  const locations = [
    "Main Gate",
    "Student Center",
    "Library",
    "Science Building",
    "Sports Complex",
    "Dormitory A",
    "Dormitory B",
    "Parking Lot"
  ];

  // Generate time slots from 9 AM to 7 PM with 30-min gaps
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 19; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      slots.push(`${hourStr}:00 - ${hourStr}:15`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isDateUnavailable = (date:Date) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    
    return date < currentDate || date > nextDate || 
           date.getDate() !== currentDate.getDate() && 
           date.getDate() !== nextDate.getDate();
  };


  const addRoute = () => {
    setRoutes([
      ...routes,
      {
        id: routes.length + 1,
        origination: '',
        destination: '',
        timeSlot: '',
        date: null
      }
    ]);
  };

  const removeRoute = (routeId: number) => {
    setRoutes(routes.filter(route => route.id !== routeId));
  };

  const updateRoute = (id: number, field:keyof Route, value: string | Date | null) => {
    setRoutes(routes.map(route => 
      route.id === id ? { ...route, [field]: value } : route
    ));
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted routes:', routes);
  };

  return(
    <div className={styles.driver_form_container}>
        <div className={styles.driver_form_card}>
            <div className={styles.form_header}>
                <h2>Set Your Available Routes</h2>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className="routes-container">
                    {routes.map((route) => (
                        <div key={route.id} className="p-4 border rounded lg space-y-4">
                            <div className="route-header">
                                <h3>Route {route.id}</h3>
                                {routes.length > 1 && (
                                    <button type="button" className="delete-button" onClick={() => removeRoute(route.id)}>×</button>
                                )}
                            </div>
                            <div className="location-grid">
                                <div className="location-field">
                                    <label>From</label>
                                    <select value={route.origination}onChange={(e) => updateRoute(route.id, 'origination', e.target.value)}>
                                        <option value="">Select location</option>
                                        {locations.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="location-field">
                                    <label>To</label>
                                    <select value={route.destination}onChange={(e) => updateRoute(route.id, 'destination', e.target.value)}>
                                        <option value="">Select location</option>
                                        {locations.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="time-field">
                                <label>Available Time Slot</label>
                                <select
                                    value={route.timeSlot}
                                    onChange={(e) => updateRoute(route.id, 'timeSlot', e.target.value)}
                                >
                                    <option value="">Select time slot</option>
                                    {timeSlots.map(slot => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button 
                        type="button" 
                        className="add-button" 
                        onClick={addRoute}
                    >
                        + Add Another Route
                    </button>
                    <button 
                        type="submit" 
                        className="submit-button"
                    >
                        Save Availability
                    </button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default DriverAvailabilityForm