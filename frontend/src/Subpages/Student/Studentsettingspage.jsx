import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Logout from '../../Components/Logout';
import SharedSettings from '../../Components/SharedSettings';

const Studentsettingspage = () => {
  const location = useLocation();
  const rollNo = location.state?.rollNo;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (rollNo) {
      axios.get(`http://localhost:3000/student/${rollNo}`)
        .then(res => setUserData(res.data))
        .catch(err => console.error(err));
    }
  }, [rollNo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile || !rollNo) return;
    
    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const res = await axios.post(`http://localhost:3000/student/profilepic/${rollNo}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile picture updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    }
  };

  const handleUpdateProfile = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/student/${rollNo}`, formData);
      // Update local state
      setUserData(prev => ({ ...prev, ...formData }));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Change your profile picture</p>
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded-full mb-4" />}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded mb-3">
        Upload
      </button>
      <SharedSettings userType="Student" userData={userData} onUpdateProfile={handleUpdateProfile} />
      <Logout />
    </div>
  );
};

export default Studentsettingspage;
