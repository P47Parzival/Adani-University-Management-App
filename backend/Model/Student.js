const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Fullname: { type: String, required: true },
  studentStatus: { type: String, required: true, enum: ["Active", "Inactive"] },
  admissionNo: { type: String, required: true, unique: true },
  admissionYear: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  courseName: { type: String, required: true },
  college: { type: String, required: true },
  curriculumPlan: { type: String, required: true },
  profileImageUrl: { type: String }, // URL to profile image
  email: { type: String, required: true, unique: true }, // Add email field
  password: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;