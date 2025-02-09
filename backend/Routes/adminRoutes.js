const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin'); // Import Admin model

// Admin Login Route
router.post('/', async (req, res) => {
  const { role, email, password, adminID } = req.body;

  try {
    let admin;
    // Find admin by email and adminID (case-insensitive)
    if(role === 'admin') {
      admin = await Admin.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') }
      });
    }

    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
    if (admin.password !== password) return res.status(401).json({ success: false, message: "Incorrect password" });

    res.json({ success: true, message: "Admin login successful", userID: admin._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//get all faculty
router.get('/count', async(req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.json({count});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

//route to add new faculty
router.post('/newfaculty', async (req, res) => {
  try {
    const newFaculty = new Admin(req.body);
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    console.error('Error adding new faculty:', err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Admin by ID (adminID)
router.get('/:adminID', async (req, res) => {
  try {
    const admin = await Admin.findOne({adminID: req.params.adminID});
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
