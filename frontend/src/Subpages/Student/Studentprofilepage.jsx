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
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src={`http://localhost:3000${student.profileImageUrl}`} 
            alt="Student" 
            className="w-48 h-48 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{student.Fullname}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Status: </span>
                <span className="text-gray-800 dark:text-white">Active</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Admission No: </span>
                <span className="text-gray-800 dark:text-white">{student.admissionNo}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Roll No: </span>
                <span className="text-gray-800 dark:text-white">{student.rollNo}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Admission Year: </span>
                <span className="text-gray-800 dark:text-white">{student.admissionYear}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Degree: </span>
                <span className="text-gray-800 dark:text-white">{student.degree}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Department: </span>
                <span className="text-gray-800 dark:text-white">{student.department}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Semester: </span>
                <span className="text-gray-800 dark:text-white">{student.semester}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Course: </span>
                <span className="text-gray-800 dark:text-white">{student.courseName}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">College: </span>
                <span className="text-gray-800 dark:text-white">{student.college}</span>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-200">Curriculum: </span>
                <span className="text-gray-800 dark:text-white">{student.curriculumPlan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studentprofilepage
