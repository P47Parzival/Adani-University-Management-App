import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminViewComplainPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/complain')
      .then(res => setComplaints(res.data))
      .catch(err => console.error('Error fetching complaints:', err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/complain/${id}`, { status });
      setComplaints(prevComplaints => 
        prevComplaints.map(complaint => complaint._id === id ? { ...complaint, status } : complaint)
      );
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-300";
      case "In Progress": return "bg-blue-300";
      case "Resolved": return "bg-green-300";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Complaints</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Complaint</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="border">
              <td className="border p-2">{complaint.studentName}</td>
              <td className="border p-2">{complaint.complaintText}</td>
              <td className={`border p-2 ${getStatusBgColor(complaint.status)}`}>{complaint.status}</td>
              <td className="border p-2">
                <select 
                  value={complaint.status} 
                  onChange={(e) => updateStatus(complaint._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewComplainPage;
