const express = require('express');
const router = express.Router();
const Student = require('../Model/Student');
const fs = require('fs');
const path = require('path');

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

const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profilepic/'); // Save uploaded images in this folder
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.rollNo}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Upload profile picture route
router.post('/profilepic/:rollNo', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Find student by roll number
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Update student record with image path
    student.profileImageUrl = `/profilepic/${req.file.filename}`;
    await student.save();

    res.json({ success: true, message: 'Profile picture uploaded successfully', filePath: student.profileImageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// View assignments
router.get('/assignments', async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '../uploads/'); // Path to uploads folder
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Unable to read files" });
      }
      res.json({ success: true, files });
    });
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

//fetch student for attendance 
router.get('/fetchstudent', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
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
