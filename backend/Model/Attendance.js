const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Professor"], required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Professor
});
  
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
});
  
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;

const attendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: true }, // true = Present, false = Absent
});
  
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
  