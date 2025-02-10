import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Enter = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [adminID, setAdminID] = useState('');
  const [professorID, setProfessorID] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'student', label: 'Student' },
    { value: 'professor', label: 'Professor' },
  ];

  const handledropdownchange = (e) => {
    setRole(e.target.value);
    setRollNo(''); // Reset rollNo when changing role
    setAdminID(''); // Reset adminID when changing role
  };

  const handleLogin = async () => {
    if (!role || !email || !password || (role === 'student' && !rollNo) || (role === 'admin' && !adminID) || (role === 'professor' && !professorID)) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const requestData = { role, email, password };
      if (role === 'student') {
        requestData.rollNo = rollNo;
      } 
      else if (role === 'admin') {
        requestData.adminID = adminID; // Include adminID in request data
      }
      else if (role === 'professor') {
        requestData.professorID = professorID; // Include professorID in request data
      }

      const response = await axios.post(`http://localhost:3000/${role}`, requestData);
      if (response.data.success) {
        const navigateState = { state: { role } };
        if (role === 'student') {
          navigateState.state.rollNo = rollNo;
        } else if (role === 'admin') {
          navigateState.state.adminID = adminID;
        } else if (role === 'professor') {
          navigateState.state.professorID = professorID;
        } else{
          console.log("Do nothing"); // Do nothing
        }
        navigate(`/${role.toLowerCase()}dashboardpage`, navigateState);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <div className='h-[400px] w-[300px] flex flex-col items-center justify-center space-y-4 bg-white rounded-md p-4'>
        <select onChange={handledropdownchange} className='border-2 border-black p-2 w-full'>
          <option value="">Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={role.value}>{role.label}</option>
          ))}
        </select>

        <input
          className='border-2 border-black p-2 w-full'
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className='border-2 border-black p-2 w-full'
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {role === 'student' && (
          <input
            className='border-2 border-black p-2 w-full'
            type="text"
            placeholder='Enter your roll no'
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        )}

        {role === 'admin' && (
          <input
            className='border-2 border-black p-2 w-full'
            type="text"
            placeholder='Enter your admin ID'
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
          />
        )}

        {role === 'professor' && (
          <input
            className='border-2 border-black p-2 w-full'
            type="text"
            placeholder='Enter your professor ID'
            value={professorID}
            onChange={(e) => setProfessorID(e.target.value)}
          />
        )}

        <button className='bg-black text-white p-2 w-full' onClick={handleLogin}>Enter</button>
      </div>
    </div>
  );
};

export default Enter;
