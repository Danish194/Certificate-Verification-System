import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  internshipDomain: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export const Certificate = mongoose.model('Certificate', certificateSchema);
