
// models/Road.js
const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema({
  start_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  end_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  distance: Number,
  traffic_condition: { type: String, enum: ['clear', 'moderate', 'heavy'], default: 'clear' },
});

module.exports = mongoose.model('Road', roadSchema);

