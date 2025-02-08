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
      let admin = await Admin.findOne({
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

// Get Admin by ID (adminID)
router.get('/:adminID', async (req, res) => {
  try {
    const admin = await Admin.findById({adminID: req.params.adminID});
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
