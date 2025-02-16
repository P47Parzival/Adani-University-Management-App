import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminmanageStudentsPage = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [newStudent, setNewStudent] = useState({
    Fullname: '',
    studentStatus: 'Active',
    admissionNo: '',
    admissionYear: '',
    rollNo: '',
    degree: '',
    department: '',
    semester: '',
    courseName: '',
    college: '',
    curriculumPlan: '',
    profileImageUrl: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/student/count')
      .then((response) => {
        setTotalStudents(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/student/newstudent', newStudent)
      .then(() => {
        // Re-fetch the updated count after successful student addition
        axios.get('http://localhost:3000/student/count')
          .then((response) => {
            setTotalStudents(response.data.count);
          })
          .catch((error) => {
            console.error('Error updating student count:', error);
          });
  
        // Clear form fields
        setNewStudent({
          Fullname: '',
          studentStatus: 'Active',
          admissionNo: '',
          admissionYear: '',
          rollNo: '',
          degree: '',
          department: '',
          semester: '',
          courseName: '',
          college: '',
          curriculumPlan: '',
          profileImageUrl: '',
          email: '',
          password: ''
        });
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Students</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h2>
          <div className="text-3xl font-bold text-blue-600">{totalStudents}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Students</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors" onClick={() => document.getElementById('addStudentForm').classList.toggle('hidden')}>
            Add New
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payments Done</h2>
          <div className="text-3xl font-bold text-green-600">120</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payments Pending</h2>
          <div className="text-3xl font-bold text-red-600">30</div>
        </div>
      </div>

      <form id="addStudentForm" className="hidden mt-6 bg-white p-6 rounded-lg shadow-md" onSubmit={handleAddStudent}>
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="Fullname" value={newStudent.Fullname} onChange={handleInputChange} placeholder="Fullname" className="p-2 border rounded" required />
          <input type="text" name="admissionNo" value={newStudent.admissionNo} onChange={handleInputChange} placeholder="Admission No" className="p-2 border rounded" required />
          <input type="text" name="admissionYear" value={newStudent.admissionYear} onChange={handleInputChange} placeholder="Admission Year" className="p-2 border rounded" required />
          <input type="text" name="rollNo" value={newStudent.rollNo} onChange={handleInputChange} placeholder="Roll No" className="p-2 border rounded" required />
          <input type="text" name="degree" value={newStudent.degree} onChange={handleInputChange} placeholder="Degree" className="p-2 border rounded" required />
          <input type="text" name="department" value={newStudent.department} onChange={handleInputChange} placeholder="Department" className="p-2 border rounded" required />
          <input type="text" name="semester" value={newStudent.semester} onChange={handleInputChange} placeholder="Semester" className="p-2 border rounded" required />
          <input type="text" name="courseName" value={newStudent.courseName} onChange={handleInputChange} placeholder="Course Name" className="p-2 border rounded" required />
          <input type="text" name="college" value={newStudent.college} onChange={handleInputChange} placeholder="College" className="p-2 border rounded" required />
          <input type="text" name="curriculumPlan" value={newStudent.curriculumPlan} onChange={handleInputChange} placeholder="Curriculum Plan" className="p-2 border rounded" required />
          <input type="text" name="profileImageUrl" value={newStudent.profileImageUrl} onChange={handleInputChange} placeholder="Profile Image URL" className="p-2 border rounded" />
          <input type="email" name="email" value={newStudent.email} onChange={handleInputChange} placeholder="Email" className="p-2 border rounded" required />
          <input type="password" name="password" value={newStudent.password} onChange={handleInputChange} placeholder="Password" className="p-2 border rounded" required />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Add Student</button>
      </form>
    </div>
  );
};

export default AdminmanageStudentsPage;