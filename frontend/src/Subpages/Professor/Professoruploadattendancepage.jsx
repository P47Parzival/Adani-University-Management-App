import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ProfessorAttendancePage = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const semesters = [
    { value: '1', label: '1st Semester' },
    { value: '2', label: '2nd Semester' },
    { value: '3', label: '3rd Semester' },
    { value: '4', label: '4th Semester' },
    { value: '5', label: '5th Semester' },
    { value: '6', label: '6th Semester' },
    { value: '7', label: '7th Semester' },
    { value: '8', label: '8th Semester' }
  ];

  // Fetch all students once
  useEffect(() => {
    axios.get('http://localhost:3000/student/fetchstudent')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter students based on selected semester
  useEffect(() => {
    if (selectedSemester) {
      setFilteredStudents(students.filter(student => student.semester === selectedSemester));
    } else {
      setFilteredStudents([]);
    }
  }, [selectedSemester, students]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toggleAttendance = (rollNo) => {
    setFilteredStudents(prevStudents =>
      prevStudents.map(student =>
        student.rollNo === rollNo
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };
  
  const handleSubmit = async () => {
    generateExcelFile(); // Generate the Excel file before submission
    
    const data = filteredStudents.map(student => ({
      rollNo: student.rollNo,   // Ensure key names match the backend
      Fullname: student.Fullname, 
      isPresent: student.isPresent, 
      semester: student.semester
    }));
    
    try {
      const response = await axios.post('http://localhost:3000/attendance/submit', data);
      console.log(response.data);
      alert('Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Failed to submit attendance.');
    }
  };
  
  const generateExcelFile = () => {
    const data = filteredStudents.map(student => ({
      'Enrollment No.': student.rollNo,
      'Name': student.Fullname,
      'Attendance': student.isPresent ? 'Present' : 'Absent' // Ensure isPresent is always defined
    }));
  
    if (data.length === 0) {
      alert("No students to export!");
      return;
    }
  
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance.xlsx');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Mark Attendance</h1>
          <span className="text-gray-600">{currentDate}</span>
        </div>
      </div>

      {/* Dropdown */}
      <select onChange={(e) => setSelectedSemester(e.target.value)} className='border-2 font-serif p-2 mb-4'>
        <option value="">Select Semester</option>
        {semesters.map((sem, index) => (
          <option key={index} value={sem.value}>{sem.label}</option>
        ))}
      </select>

      <div className="overflow-x-auto pt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Enrollment No.</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.Fullname}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleAttendance(student.rollNo)}
                      className={`px-4 py-2 rounded-md text-sm font-medium text-white
                        ${student.isPresent
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                      {student.isPresent ? 'Present' : 'Absent'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No students found for the selected semester.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfessorAttendancePage;
