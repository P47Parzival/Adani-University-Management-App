import React, { useState } from 'react';
import axios from 'axios';

const Professoruploadassignmentspage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('assignmentFile', file);

    try {
      const response = await axios.post('http://localhost:3000/professor/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage(response.data.message);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Assignments</h1>
      <input type="file" onChange={handleFileChange} className="mb-2 p-2 border" />
      <button onClick={handleUpload} className="ml-2 p-2 bg-blue-500 text-white rounded">Upload</button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Professoruploadassignmentspage;
