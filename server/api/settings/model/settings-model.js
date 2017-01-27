// app/models/bear.js
import mongoose from 'mongoose';

const _settingsSchema = {
    automation: String,
    home: String,
    sleeping: String,
    minTemp: String,
    lightDetect: String,
    alarmState: String,
    alarm: String
};

export default mongoose.Schema(_settingsSchema);