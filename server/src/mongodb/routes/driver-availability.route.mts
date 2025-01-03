import { Request, Response, Router } from "express";
import { redisClient } from "../../app.mjs";
import Drivermodel from "../models/driver-signup.model.mjs";
import BookingModel from "../models/driver-booking.model.mjs";
const availability_router = Router()

interface AvailabilityRequest {
    driverId: string;
    timeframes: Array<{
        startTime: string;  // Format: "HH:mm"
        endTime: string;    // Format: "HH:mm"
    }>;
}

availability_router.post('/make-available', async (req, res) => {
    const { driverId, timeframes } = req.body as AvailabilityRequest;

    if (!driverId || !timeframes || !Array.isArray(timeframes)) {
        res.status(400).json({ 
            message: 'Missing required fields: driverId and selectedTimeSlots array are required' 
        });
        return;
    }
  
    try {
      // Fetch driver details from the database
      const driver = await Drivermodel.findById(driverId);
  
      if (!driver) {
        res.status(404).json({ message: 'Driver not found' });
        return;
      }
      // Cache driver details in Redis
      const driverDetails = {
        name: driver.name,
        plateNumber: driver.plateNumber,
        carDescription: driver.carDescription,
      };
  
      await redisClient.set(`driver:${driverId}`, JSON.stringify(driverDetails), {
        EX: 3600, // Cache expiration time in seconds (e.g., 1 hour)
      });
  
      // Save the availability timeframe
      const availabilityRecords = await Promise.all(
        timeframes.map(async (slot) => {
            // Create a new availability record for each slot
            const availability = new BookingModel({
                driverId,
                startTime: slot.startTime,
                endTime: slot.endTime,
                seatsAvailable: 4,  // Each slot starts fresh with 4 seats
                status: 'ACTIVE'
            });

            return availability.save();
        })
        );

        res.status(201).json({ 
            message: 'Driver availability slots created', 
            availabilitySlots: availabilityRecords
        });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
export default availability_router