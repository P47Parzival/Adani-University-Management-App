// backend/Routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../Model/Attendance');

// Submit attendance
router.post('/submit', async (req, res) => {
  try {
    const { subject, year, section, date, records } = req.body;
    
    // Create new attendance record
    const newAttendance = new Attendance({
      subject,
      year,
      section,
      date,
      records
    });

    // Save to database
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
});

// Get student attendance
router.get('/student/:rollNo', async (req, res) => {
  try {
    const attendance = await Attendance.find({
      'records.rollNo': req.params.rollNo
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

module.exports = router;