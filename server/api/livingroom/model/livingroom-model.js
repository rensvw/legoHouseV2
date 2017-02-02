// app/models/bear.js
import mongoose from 'mongoose';

const _livingRoomValuesSchema = {
    lamp: String,
    heating: String,
    movingSensor: String,
    doorSensor: String,
    windowSensor: String,
    tempSensor: String,
    lightSensor: String,
    buzzerState: String,
    createdAt: { type: Date, default: Date.now }
};

export default mongoose.Schema(_livingRoomValuesSchema);