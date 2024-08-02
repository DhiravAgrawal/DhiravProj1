const mongoose = require('mongoose');

const trafficUpdateSchema = new mongoose.Schema({
  road: { type: mongoose.Schema.Types.ObjectId, ref: 'Road' },
  timestamp: Date,
  traffic_condition: { type: String, enum: ['clear', 'moderate', 'heavy'] },
});

module.exports = mongoose.model('TrafficUpdate', trafficUpdateSchema);
