import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Adminprofilepage = () => {
  const [admin, setAdmin] = useState(null);
  const location = useLocation();
  const adminID = location.state?.adminID; // Correctly access adminID

  useEffect(() => {
    if (adminID) {
      axios.get(`http://localhost:3000/${adminID}`)
        .then(res => {
          setAdmin(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [adminID]);

  if (!admin) {
    return <div>Loading...</div>; // Show loading state instead of "you are not admin"
  }

  return (
    <div className="flex border rounded-lg bg-sky-100 shadow-md overflow-hidden">
      <div className="w-1/3 p-8">
        <img 
          src={admin.profileImageUrl || "https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true"} 
          alt="Admin" 
          className="w-full h-auto object-cover rounded"
          style={{
            width: '150px',
            height: '200px',
            borderRadius: '8px',
            '@media (min-width: 320px) and (max-width: 767px)': {
              width: '80px',
              height: '108px',
            }
          }}
        />
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">{admin.Fullname}</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Admin Status:</span>
            <span className="w-1/2">{admin.adminStatus}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Email:</span>
            <span className="w-1/2">{admin.email}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Phone:</span>
            <span className="w-1/2">{admin.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminprofilepage;