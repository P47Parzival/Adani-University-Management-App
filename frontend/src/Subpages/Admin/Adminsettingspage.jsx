// src/Subpages/Admin/Adminsettingspage.jsx
import React from 'react'
import SharedSettings from '../../Components/SharedSettings';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Adminsettingspage = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const adminID = location.state?.adminID;

  useEffect(() => {
    if (adminID) {
      axios.get(`http://localhost:3000/admin/${adminID}`)
        .then(res => setUserData(res.data))
        .catch(err => console.error(err));
    }
  }, [adminID]);

  const handleUpdateProfile = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/admin/${adminID}`, formData);
      setUserData(prev => ({ ...prev, ...formData }));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return <SharedSettings userType="Admin" userData={userData} onUpdateProfile={handleUpdateProfile} />;
};

export default Adminsettingspage
