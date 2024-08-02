
import mongoose from 'mongoose';

const roadSchema = new mongoose.Schema({
  start_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  end_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  distance: Number,
  traffic_condition: { type: String, enum: ['clear', 'moderate', 'heavy'], default: 'clear' },
});

const Road = mongoose.model('Road', roadSchema);

export default Road;

