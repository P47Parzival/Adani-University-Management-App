import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';

const ProfessorHeader = () => {
  const [professor, setProfessor] = useState(null);
  const location = useLocation();
  const professorID = location.state?.professorID;

  useEffect(() => {
    if (professorID) {
      axios.get(`http://localhost:3000/professor/${professorID}`)
        .then(res => {
          setProfessor(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [professorID]);

  if (!professor) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-[86px] p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 dark:text-white'>
      <div>
        <img className='h-12 w-auto' src="https://github.com/P47Parzival/Adani-University-Management-App/blob/main/frontend/src/assets/Adani-University-Logo.png?raw=true" alt="University Logo" />
      </div>
      <div className='flex items-center space-x-4'> 
        <div className='flex items-center space-x-2'>
          <img className='h-8 rounded-full' src="https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true" alt="Profile" />
          <h1>{professor.Fullname}</h1>
        </div>
        <Logout></Logout>
      </div>
    </div>
  );
};

export default ProfessorHeader;
