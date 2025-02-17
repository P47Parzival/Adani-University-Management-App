import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Professoruploadattendancepage = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectAll, setSelectAll] = useState(true);

  // Sample data
  const subjects = ['Data Structures', 'Operating Systems', 'Database Management', 'Computer Networks'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const sections = ['ICT', 'CSE-A', 'CSE-B', 'CSE-C'];
  
  // Sample student data
  const sampleStudents = {
    '3rd Year': {
      'CSE-A': [
        { id: 1, rollNo: '1AUA23BCS040', name: 'Aarav Sharma' },
        { id: 2, rollNo: '1AUA23BCS041', name: 'Ishita Patel' },
        { id: 3, rollNo: '1AUA23BCS042', name: 'Raj Patel' },
        { id: 4, rollNo: '1AUA23BCS043', name: 'Priya Shah' },
        { id: 5, rollNo: '1AUA23BCS044', name: 'Amit Kumar' }
      ],
      'CSE-B': [
        { id: 6, rollNo: '1AUA23BCS045', name: 'Neha Singh' },
        { id: 7, rollNo: '1AUA23BCS046', name: 'Rahul Mehta' },
        { id: 8, rollNo: '1AUA23BCS047', name: 'Anjali Desai' }
      ],
      'CSE-C': [
        { id: 9, rollNo: '1AUA23BCS048', name: 'Vikram Patel' },
        { id: 10, rollNo: '1AUA23BCS049', name: 'Meera Shah' },
        { id: 11, rollNo: '1AUA23BCS050', name: 'Arjun Singh' }
      ]
    }
  };

  useEffect(() => {
    if (selectedYear && selectedSection) {
      const filteredStudents = sampleStudents[selectedYear]?.[selectedSection] || [];
      setStudents(filteredStudents);
      const initialAttendance = {};
      filteredStudents.forEach(student => {
        initialAttendance[student.id] = selectAll;
      });
      setAttendance(initialAttendance);
    }
  }, [selectedYear, selectedSection]);

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = !selectAll;
    });
    setAttendance(newAttendance);
  };

  const handleKeyPress = (e, currentIndex) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      e.preventDefault();
      const nextStudent = students[currentIndex + 1];
      if (nextStudent) {
        // Move focus to next checkbox
        document.getElementById(`attendance-${nextStudent.id}`).focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevStudent = students[currentIndex - 1];
      if (prevStudent) {
        // Move focus to previous checkbox
        document.getElementById(`attendance-${prevStudent.id}`).focus();
      }
    } else if (e.key === ' ') { // Space bar
      e.preventDefault();
      toggleAttendance(students[currentIndex].id);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !selectedYear || !selectedSection || !date) {
      alert('Please fill in all fields');
      return;
    }

    const attendanceData = {
      subject: selectedSubject,
      year: selectedYear,
      section: selectedSection,
      date: date,
      records: students.map(student => ({
        rollNo: student.rollNo,
        name: student.name,
        isPresent: attendance[student.id]
      }))
    };

    try {
      const response = await axios.post('http://localhost:3000/attendance/submit', attendanceData);
      if (response.status === 201) {
        alert('Attendance submitted successfully!');
        // Reset form
        setSelectedSubject('');
        setSelectedYear('');
        setSelectedSection('');
        setDate('');
        setStudents([]);
        setAttendance({});
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      const errorMessage = error.response?.data?.error || error.message;
      alert(`Failed to submit attendance: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Attendance</h1>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Section</option>
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quick Actions */}
      {students.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectAll
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white transition-colors`}
            >
              {selectAll ? 'Mark All Present' : 'Mark All Absent'}
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Tip: Use Up/Down arrows or Enter to navigate
          </div>
        </div>
      )}

      {/* Attendance Table */}
      {students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border p-2">Roll No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr 
                  key={student.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    attendance[student.id] ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <td className="border p-2 text-center">{student.rollNo}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">
                    <div className="flex justify-center items-center space-x-2">
                      <input
                        id={`attendance-${student.id}`} // Add ID for focusing
                        type="checkbox"
                        checked={attendance[student.id]}
                        onChange={() => toggleAttendance(student.id)}
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        tabIndex={0} // Make it focusable
                      />
                      <span className={`text-sm font-medium ${
                        attendance[student.id] ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {attendance[student.id] ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      ) : (
        selectedYear && selectedSection && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No students found for selected year and section
          </div>
        )
      )}
    </div>
  );
};

export default Professoruploadattendancepage;
