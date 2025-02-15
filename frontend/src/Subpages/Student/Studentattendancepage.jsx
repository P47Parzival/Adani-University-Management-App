import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Studentattendancepage = () => {
  const [attendance, setAttendance] = useState([]);
  const location = useLocation();
  const rollNo = location.state?.rollNo;

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

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index}>
                <td className="border p-2">{record.subject}</td>
                <td className="border p-2">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  <span className={`px-2 py-1 rounded ${
                    record.records.find(r => r.rollNo === rollNo)?.isPresent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.records.find(r => r.rollNo === rollNo)?.isPresent ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Studentattendancepage;
