import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Professorprofilepage = () => {
  const [professor, setProfessor] = useState(null)
  const location = useLocation()
  const professorID = location.state?.professorID

  useEffect(() => {
    axios.get(`http://localhost:3000/professor/${professorID}`)
      .then(res => {
        setProfessor(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [professorID])

  if(!professor) { return <div>Loading...</div> }
  return (
    <div className="flex bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 overflow-hidden">
      <div className="w-1/3 p-8">
        <img 
          src={professor.profileImageUrl || "https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true"}
          alt="Professor" 
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
        <h2 className="text-xl font-bold mb-4">{professor.Fullname}</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Professor Status:</span>
            <span className="w-1/2">{professor.professorStatus}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Professor ID:</span>
            <span className="w-1/2">{professor.professorID}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Department:</span>
            <span className="w-1/2">{professor.department}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Role:</span>
            <span className="w-1/2">Professor</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Email:</span>
            <span className="w-1/2">{professor.email}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Phone:</span>
            <span className="w-1/2">{professor.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Professorprofilepage