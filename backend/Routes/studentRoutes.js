const express = require('express');
const router = express.Router();
const Student = require('../Model/Student');

// Login route
router.post('/', async (req, res) => {
  const { role, email, password, rollNo } = req.body;

  try {
    let user;

    if (role === 'student') {
      // Use case-insensitive email search
      user = await Student.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') } 
      });
      
      if (!user) return res.status(404).json({ success: false, message: "Student not found" });
      if (user.password !== password) return res.status(401).json({ success: false, message: "Incorrect password" });

      if (rollNo && user.rollNo !== rollNo) {
        return res.status(401).json({ success: false, message: "Incorrect roll number" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    res.json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all students
router.get('/count', async(req, res) => {
  try {
   const count = await Student.countDocuments();
   res.json({count});
  } catch (error) {
   console.error(error);
   res.status(500).json({ success: false, message: "Server error" });
  }
})

// Route to add a new student
router.post('/newstudent', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get student by roll number
router.get('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }); // rollNo is case-sensitive
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;