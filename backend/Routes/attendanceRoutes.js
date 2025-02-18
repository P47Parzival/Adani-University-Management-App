// backend/Routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../Model/Attendance');

// Submit attendance
router.post('/submit', async (req, res) => {
  try {
    const attendanceRecords = req.body;

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return res.status(400).json({ error: 'Invalid attendance data' });
    }

    for (const record of attendanceRecords) {
      if (!record.Fullname || !record.rollNo) {
        return res.status(400).json({ error: 'Each attendance record must contain Fullname and rollNo' });
      }
    }
    
    await Attendance.insertMany(attendanceRecords);

    res.status(201).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
});

// Get student attendance
router.get('/student/:rollNo', async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const attendanceRecords = await Attendance.find({ rollNo: rollNo }); // Ensure key matches DB schema

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ error: 'No attendance records found for this student' });
    }

    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});


module.exports = router;

