import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Studentattendancepage = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const location = useLocation();
  const rollNo = location.state?.rollNo;

  // Sample subjects (you can fetch this from your backend)
  const subjects = ['All Subjects', 'Data Structures', 'Operating Systems', 'Database Management', 'Computer Networks'];

  useEffect(() => {
    if (rollNo) {
      fetchAttendance();
    }
  }, [rollNo]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/attendance/student/${rollNo}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Group attendance by subject
  const groupedAttendance = attendance.reduce((acc, record) => {
    if (!acc[record.subject]) {
      acc[record.subject] = [];
    }
    acc[record.subject].push(record);
    return acc;
  }, {});

  // Calculate attendance percentage for each subject
  const calculateAttendanceStats = (records) => {
    const total = records.length;
    const present = records.filter(record => 
      record.records.find(r => r.rollNo === rollNo)?.isPresent
    ).length;
    const percentage = (present / total) * 100;
    return {
      total,
      present,
      absent: total - present,
      percentage: percentage.toFixed(1)
    };
  };

  // Filter attendance based on selected subject
  const filteredAttendance = selectedSubject === 'all' 
    ? attendance 
    : attendance.filter(record => record.subject === selectedSubject);

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

      {/* Subject Selection and Overview Cards */}
      <div className="mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Subjects</option>
          {Object.keys(groupedAttendance).map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(groupedAttendance).map(([subject, records]) => {
            const stats = calculateAttendanceStats(records);
            return (
              <div 
                key={subject}
                className={`p-4 rounded-lg ${
                  stats.percentage >= 75 ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
                } ${selectedSubject === subject ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedSubject(subject)}
              >
                <h3 className="font-semibold mb-2">{subject}</h3>
                <div className="text-sm">
                  <p>Total Classes: {stats.total}</p>
                  <p>Present: {stats.present}</p>
                  <p>Absent: {stats.absent}</p>
                  <p className="font-bold">
                    Attendance: {stats.percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((record, index) => {
              const studentRecord = record.records.find(r => r.rollNo === rollNo);
              return (
                <tr 
                  key={index}
                  className={`${
                    studentRecord?.isPresent 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : 'bg-red-50 dark:bg-red-900/20'
                  } hover:opacity-80 transition-opacity`}
                >
                  <td className="border p-2">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="border p-2">{record.subject}</td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      studentRecord?.isPresent
                        ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {studentRecord?.isPresent ? 'Present' : 'Absent'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Studentattendancepage;
