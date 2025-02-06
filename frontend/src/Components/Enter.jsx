import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Enter = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'student', label: 'Student' },
    { value: 'professor', label: 'Professor' },
    { value: 'staff', label: 'Staff' },
    { value: 'hod', label: 'HOD' },
  ];

  const handledropdownchange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async () => {
    if (!role || !email || !password || (role === 'student' && !rollNo)) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const requestData = { role, email, password };
      if (role === 'student') {
        requestData.rollNo = rollNo;
      }

      const response = await axios.post('http://localhost:3000/login', requestData);
      if (response.data.success) {
        const navigateState = { state: { role } };
        if (role === 'student') {
          navigateState.state.rollNo = rollNo;
        }
        navigate(`/${role.toLowerCase()}dashboardpage`, navigateState);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <div className='h-[350px] w-[300px] flex flex-col items-center justify-center space-y-4 bg-white rounded-md'>
        <select onChange={handledropdownchange}>
          <option>Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={role.value}>{role.label}</option>
          ))}
        </select>
        <input
          className='border-2 border-black'
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='border-2 border-black'
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {role === 'student' && (
          <input
            className='border-2 border-black'
            type="text"
            placeholder='Enter your roll no'
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        )}
        <button className='bg-black text-white p-2' onClick={handleLogin}>Enter</button>
      </div>
    </div>
  );
};

export default Enter;
