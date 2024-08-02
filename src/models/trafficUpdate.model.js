import mongoose from 'mongoose';

const trafficUpdateSchema = new mongoose.Schema({
  road: { type: mongoose.Schema.Types.ObjectId, ref: 'Road' },
  timestamp: Date,
  traffic_condition: { type: String, enum: ['clear', 'moderate', 'heavy'] },
});

const TrafficUpdate = mongoose.model('TrafficUpdate', trafficUpdateSchema);
export default TrafficUpdate;