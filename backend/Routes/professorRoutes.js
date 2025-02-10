const express = require('express');
const router = express.Router();
const Professor = require('../Model/Professor'); // Import Professor model

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