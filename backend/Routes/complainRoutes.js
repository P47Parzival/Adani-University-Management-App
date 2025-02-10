const express = require('express');
const router = express.Router();
const Complain = require('../Model/Complain');

// Student submits complain
router.post('/', async (req, res) => {
    try {
        const { studentName, complaintText } = req.body;
        const newComplaint = new Complain({ studentName, complaintText });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register complaint' });
    }
});

// Admin views all complains
router.get('/', async (req, res) => {
    try {
        const complaints = await Complain.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Update complain status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedComplaint = await Complain.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

module.exports = router;