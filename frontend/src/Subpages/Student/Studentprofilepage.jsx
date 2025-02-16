import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Studentprofilepage = () => {
  const [student, setStudent] = useState(null)
  const location = useLocation();
  const rollNo = location.state?.rollNo;
  
  useEffect(() => {
    if (rollNo) {
      axios.get(`http://localhost:3000/student/${rollNo}`)
        .then(res => {
          setStudent(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [rollNo]);

  if(!student) { return <div>Loading...</div> }

  return (
    <div className="flex border rounded-lg bg-sky-100 shadow-md overflow-hidden">
      <div className="w-1/3 p-8">
      <img 
          src={`http://localhost:3000${student.profileImageUrl}`} 
          alt="Student" 
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
        <h2 className="text-xl font-bold mb-4">{student.Fullname}</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Student Status:</span>
            <span className="w-1/2">Active</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Admission no:</span>
            <span className="w-1/2">{student.admissionNo}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Admission year:</span>
            <span className="w-1/2">{student.admissionYear}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Roll no.:</span>
            <span className="w-1/2">{student.rollNo}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Degree:</span>
            <span className="w-1/2">{student.degree}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Department:</span>
            <span className="w-1/2">{student.department}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Semester:</span>
            <span className="w-1/2">{student.semester}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Course Name:</span>
            <span className="w-1/2">{student.coursename}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">College:</span>
            <span className="w-1/2">{student.college}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Curriculum Plan:</span>
            <span className="w-1/2">{student.curriculumPlan}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studentprofilepage
