import { model, Schema } from "mongoose";
const driverBookingSchema = new Schema({
    driverId: { type: Schema.Types.ObjectId, ref: "Driver", required: true }, // Reference to the Driver schema
    startTime:{type: Date, required: true},
    endTime:{type:Date, required: true},
    seatsAvailable:{ type:Number, default: 4, min: 0, max:4 },
    
})

// plateNumber: String, // Cached from the Driver schema for convenience
    // name: String, // Cached from the Driver schema
    // seatsAvailable: Number,
    // timeframes: [String], // Array of timeframes (e.g., ["9:00-9:15", "9:15-9:30"])
    // isAvailable: { type: Boolean, default: true }, // Default to true when created
    // availabilityEndTime: Date, // When this availability record should expire
    // createdAt: { type: Date, default: Date.now },