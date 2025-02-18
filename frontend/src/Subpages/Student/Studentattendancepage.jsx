import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAttendancePage = () => {
  const [rollNo, setRollNo] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    if (!rollNo.trim()) {
      setError('Please enter your roll number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:3000/attendance/student/${rollNo}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError('Failed to fetch attendance. Please check your roll number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Attendance</h1>

      {/* Input for Roll Number */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border p-2 mr-2 text-black"
        />
        <button
          onClick={fetchAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Fetch Attendance
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Attendance Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        attendance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendance.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-black">{new Date(record.date).toLocaleDateString()}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${record.isPresent ? 'text-green-600' : 'text-red-600'}`}>
                      {record.isPresent ? 'Present' : 'Absent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No attendance records found.</p>
        )
      )}
    </div>
  );
};

export default StudentAttendancePage;
