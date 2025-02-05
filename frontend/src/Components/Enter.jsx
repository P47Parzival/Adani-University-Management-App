import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Enter = () => {
    const [role, setRole] = useState('');
    const roles = [
        {value: 'admin', label: 'Admin'},
        {value: 'Student', label: 'Student'},
        {value: 'pofessor', label: 'Professor'},
        {value: 'staff', label: 'Staff'},
        {value: 'hod', label: 'HOD'},
    ]
    const handledropdownchange = (e) => {
        setRole(e.target.value);
    }

  return (
    <div>
      <div className='h-[350px] w-[300px] flex flex-col items-center justify-center space-y-4 bg-white rounded-md'>
        <select onChange={handledropdownchange}>
            <option>Select Role</option>
            {roles.map((role, index) => {
                return (
                    <option key={index} value={role.value}>{role.label}</option>
                )
            })}
        </select>
        <input className='border-2 border-black' type="email" placeholder='Enter your email'/>
        <input className='border-2 border-black' type="password" placeholder='Enter your password'/>
        <Link to={`/${role}dashboardpage`}>
          <button className='bg-black text-white p-2'>Enter</button>
        </Link>
      </div>
    </div>
  )
}

export default Enter
