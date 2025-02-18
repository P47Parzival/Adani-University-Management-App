const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  Fullname: {
    type: String,
    required: true
  },
  isPresent: {
    type: Boolean,
    required: true
  },
  semester: {
    type: String, // Optional: Helps filter attendance records by semester
    required: true
  },
  date: {
    type: Date,
    default: Date.now // Stores the date of attendance marking
  }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
