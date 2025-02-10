const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  complaintText: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Complain = mongoose.model('Complain', complainSchema);
module.exports = Complain;
