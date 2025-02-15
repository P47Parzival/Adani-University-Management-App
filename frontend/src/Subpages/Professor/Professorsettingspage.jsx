// src/Subpages/Professor/Professorsettingspage.jsx
import React from 'react';
import SharedSettings from '../../Components/SharedSettings';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Professorsettingspage = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const professorID = location.state?.professorID;

  useEffect(() => {
    if (professorID) {
      axios.get(`http://localhost:3000/professor/${professorID}`)
        .then(res => setUserData(res.data))
        .catch(err => console.error(err));
    }
  }, [professorID]);

  const handleUpdateProfile = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/professor/${professorID}`, formData);
      setUserData(prev => ({ ...prev, ...formData }));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return <SharedSettings userType="Professor" userData={userData} onUpdateProfile={handleUpdateProfile} />;
};

export default Professorsettingspage;
