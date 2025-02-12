const express = require('express')
const fs = require('fs')
const router = express.Router();
const multer = require('multer')
const path = require('path')

let latestFilePath = ""; // Store the latest uploaded file path

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "calender/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    latestFilePath = `/calender/${filename}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Upload API
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ filePath: latestFilePath });
});

// API to get the latest file
router.get("/latest-file", (req, res) => {
  if (!latestFilePath) {
    return res.status(404).json({ message: "No file uploaded yet" });
  }
  res.json({ filePath: latestFilePath });
});

module.exports = router