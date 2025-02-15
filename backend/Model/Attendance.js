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
  subject: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },
  date: { type: Date, required: true },
  records: [{
    rollNo: { type: String, required: true },
    name: { type: String, required: true },
    isPresent: { type: Boolean, required: true }
  }]
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
