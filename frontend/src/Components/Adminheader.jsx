import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';

const Adminheader = () => {
  const [admin, setAdmin] = useState(null);
  const location = useLocation();
  const adminID = location.state?.adminID;

  useEffect(() => {
    if(adminID){
      axios.get(`http://localhost:3000/admin/${adminID}`)
        .then(res => {
          setAdmin(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [adminID])

  if(!admin){ return <div>Loading...</div> }

  return (
    <div className='h-[86px] p-4 flex justify-between items-center bg-gray-200'>
      <div>
        <img className='h-12 w-auto' src="https://github.com/P47Parzival/Adani-University-Management-App/blob/main/frontend/src/assets/Adani-University-Logo.png?raw=true" alt="" />
      </div>
      <div className='flex items-center space-x-4'> 
        <div className='flex items-center space-x-2'>
            <img className='h-8 rounded-full' src="https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true" alt="" />
            <h1>{admin.Fullname}</h1>
        </div>
        <Logout></Logout>
      </div>
    </div>
  );
};

export default Adminheader;