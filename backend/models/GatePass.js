import mongoose from 'mongoose';

const gatePassSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const GatePass = mongoose.model('GatePass', gatePassSchema);
export default GatePass;
