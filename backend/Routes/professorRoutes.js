const express = require('express');
const router = express.Router();
const Professor = require('../Model/Professor'); // Import Professor model
const multer = require('multer');
const path = require('path');

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]; // Replace colons to avoid issues in filenames
    cb(null, file.fieldname + '-' + timestamp + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// File Upload Route
router.post('/upload', upload.single('assignmentFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    res.json({ success: true, message: "File uploaded successfully", filePath: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Professor Login Route
router.post('/', async (req, res) => {
  const { email, password, professorID } = req.body;

  try {
    let professor;
    // Find professor by email (case-insensitive)
    professor = await Professor.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
      professorID: professorID
    });

    if (!professor) return res.status(404).json({ success: false, message: "Professor not found" });
    if (professor.password !== password) return res.status(401).json({ success: false, message: "Incorrect password" });

    res.json({ success: true, message: "Professor login successful", userID: professor._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//Get professor by ID (professorID)
router.get('/:professorID', async (req, res) => {
  try {
    const professor = await Professor.findOne({professorID: req.params.professorID});
    if (!professor) return res.status(404).json({ error: "Professor not found" });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;