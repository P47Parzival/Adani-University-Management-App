const express = require("express");
const multer = require("multer");
const path = require("path");
const Calendar = require("../Model/Calender"); // Import the model
const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "calender/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Upload API (Save File Path in DB)
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `/calender/${req.file.filename}`;

  try {
    // Remove previous file from DB (optional)
    await Calendar.deleteMany({});
    // Store new file path in DB
    const newCalendar = new Calendar({ filePath });
    await newCalendar.save();

    res.json({ filePath });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});

// Get Latest File from DB
router.get("/latest-file", async (req, res) => {
  try {
    const latestCalendar = await Calendar.findOne().sort({ uploadedAt: -1 });

    if (!latestCalendar) {
      return res.status(404).json({ message: "No file uploaded yet" });
    }

    res.json({ filePath: latestCalendar.filePath });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});

module.exports = router;
