import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adminmanagefaculty = () => {
  const [totalFaculty, setTotalFaculty] = useState(0);
  const [newFaculty, setNewFaculty] = useState({
    Fullname: '',
    adminStatus: 'Active',
    role: 'System administrator',
    adminID: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/admin/count')
      .then((response) => {
        setTotalFaculty(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty({ ...newFaculty, [name]: value });
  };

  const handleAddFaculty = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin/newfaculty', newFaculty)
      .then(() => {
        // Re-fetch the updated count after successful faculty addition
        axios.get('http://localhost:3000/admin/count')
          .then((response) => {
            setTotalFaculty(response.data.count);
          })
          .catch((error) => {
            console.error('Error updating faculty count:', error);
          });

        // Clear form fields
        setNewFaculty({
          Fullname: '',
          adminStatus: 'Active',
          role: 'System administrator',
          adminID: '',
          email: '',
          password: '',
          phone: ''
        });
      })
      .catch((error) => {
        console.error('Error adding faculty:', error);
      });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Faculty</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Faculty</h2>
          <div className="text-3xl font-bold text-blue-600">{totalFaculty}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Faculty</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors" onClick={() => document.getElementById('addFacultyForm').classList.toggle('hidden')}>
            Add New
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Salary Paid</h2>
          <div className="text-3xl font-bold text-green-600">120</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Salary Pending</h2>
          <div className="text-3xl font-bold text-red-600">30</div>
        </div>
      </div>

      <form id="addFacultyForm" className="hidden mt-6 bg-white p-6 rounded-lg shadow-md" onSubmit={handleAddFaculty}>
        <h2 className="text-xl font-bold mb-4">Add New Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="Fullname" value={newFaculty.Fullname} onChange={handleInputChange} placeholder="Fullname" className="p-2 border rounded" required />
          <select name="adminStatus" value={newFaculty.adminStatus} onChange={handleInputChange} className="p-2 border rounded" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input type="text" name="adminID" value={newFaculty.adminID} onChange={handleInputChange} placeholder="Faculty ID" className="p-2 border rounded" required />
          <input type="email" name="email" value={newFaculty.email} onChange={handleInputChange} placeholder="Email" className="p-2 border rounded" required />
          <input type="password" name="password" value={newFaculty.password} onChange={handleInputChange} placeholder="Password" className="p-2 border rounded" required />
          <input type="text" name="phone" value={newFaculty.phone} onChange={handleInputChange} placeholder="Phone" className="p-2 border rounded" required />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Add Faculty</button>
      </form>
    </div>
  );
};

export default Adminmanagefaculty;