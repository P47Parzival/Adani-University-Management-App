const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./Model/Student');
const Admin = require('./Model/Admin'); // Import Admin model
const Professor = require('./Model/Professor'); // Import Professor model
const studentRoutes = require('./Routes/studentRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const professorRoutes = require('./Routes/professorRoutes');
const complainRoutes = require('./Routes/complainRoutes');
const calenderRoutes = require('./Routes/calenderRoutes'); // Import calender routes
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Helps parse form data
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads folder
app.use('/calender', express.static(path.join(__dirname, 'calender'))); // Serve static files from calender folder

//Dhruv shifted these route to above cause it was not fetching with others
app.use('/calender', calenderRoutes); // Import calender routes

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/universityDB')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Sample student data
const students = [
  {
    "Fullname": "Aarav Sharma",
    "studentStatus": "Active",
    "admissionNo": "230101",
    "admissionYear": "2023-24",
    "rollNo": "1AUA23BCS040",
    "degree": "Undergraduate",
    "department": "Computer Science",
    "semester": "SEMESTER - III",
    "courseName": "B. Tech. in Computer Science and Engineering (AI-ML)",
    "college": "ADANI UNIVERSITY",
    "curriculumPlan": "BTech-CSE(AI-ML)",
    "profileImageUrl": "https://randomuser.me/api/portraits/men/40.jpg",
    "email": "Dhruvmali.cse23@adaniuni.ac.in",
    "password": "pass1234",
  },
  {
    "Fullname": "Ishita Patel",
    "studentStatus": "Active",
    "admissionNo": "230102",
    "admissionYear": "2023-24",
    "rollNo": "1AUA23BCS041",
    "degree": "Undergraduate",
    "department": "Computer Science",
    "semester": "SEMESTER - III",
    "courseName": "B. Tech. in Computer Science and Engineering (AI-ML)",
    "college": "ADANI UNIVERSITY",
    "curriculumPlan": "BTech-CSE(AI-ML)",
    "profileImageUrl": "https://randomuser.me/api/portraits/women/41.jpg",
    "email": "Ishitapatel.cse23@adaniuni.ac.in",
    "password": "pass1235"
  }
];

// Sample admin data
const admins = [
  {
    "Fullname": "John Doe",
    "adminStatus": "Active",
    "role": "Administrator",
    "adminID": "123456",
    "email": "johndoe@example.com",
    "password": "adminpass123",
    "phone": "+1234567890"
  },
  {
    "Fullname": "Jane Smith",
    "adminStatus": "Inactive",
    "role": "System administrator",
    "adminID": "654321",
    "email": "janesmith@example.com",
    "password": "adminpass456",
    "phone": "+0987654321"
  }
];

// Sample professor data
const professors = [
    {
      "Fullname": "Dr. John Smith",
      "professorStatus": "Senior Lecturer",
      "department": "Computer Science",
      "email": "john.smith@university.edu",
      "password": "hashedpassword123",
      "professorID": "CS101",
      "phone": "+1-555-1234"
    },
    {
      "Fullname": "Dr. Emily Johnson",
      "professorStatus": "Associate Professor",
      "department": "Electrical Engineering",
      "email": "emily.johnson@university.edu",
      "password": "hashedpassword456",
      "professorID": "EE202",
      "phone": "+1-555-5678"
    }
];

// Function to insert sample data
const insertSampleData = async () => {
  try {
    // Insert Students if empty
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      await Student.insertMany(students);
      console.log("Students added successfully!");
    } else {
      console.log("Student data already exists, skipping insertion.");
    }

    // Insert Admins if empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.insertMany(admins);
      console.log("Admins added successfully!");
    } else {
      console.log("Admin data already exists, skipping insertion.");
    }

    // Insert Professors if empty
    const professorCount = await Professor.countDocuments();
    if (professorCount === 0) {
      await Professor.insertMany(professors);
      console.log("Professors added successfully!");
    } else {
      console.log("Professor data already exists, skipping insertion.");
    }

  } catch (err) {
    console.error("Error inserting sample data:", err);
  }
};

// Call function to insert data
insertSampleData();

// Routes
app.use('/student', studentRoutes); // Import student routes
app.use('/admin', adminRoutes); // Import admin routes
app.use('/professor', professorRoutes); // Import professor routes
app.use('/complain', complainRoutes); // Import complain routes


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
