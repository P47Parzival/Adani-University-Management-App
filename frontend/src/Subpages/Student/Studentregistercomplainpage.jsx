import React, { useState } from 'react';
import axios from 'axios';

const StudentRegisterComplainPage = () => {
  const [complaintText, setComplaintText] = useState('');
  const studentName = 'Aarav Sharma'; // Replace with actual student name

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/complain', {studentName, complaintText });
      alert('Complaint submitted successfully!');
      setComplaintText('');
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-center pb-4'>
        <h3 className='text-center w-2/3 border-2 p-2 border-orange-300 '>Caution your name will be visible to admins, complain respectfully! ⚠️</h3>
      </div>
      <h1 className="text-2xl font-bold mb-4">Register Complaint</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          className="w-full p-2 border rounded mb-4" 
          placeholder="Describe your complaint..." 
          value={complaintText} 
          onChange={(e) => setComplaintText(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Complaint</button>
      </form>
    </div>
  );
};

export default StudentRegisterComplainPage;
