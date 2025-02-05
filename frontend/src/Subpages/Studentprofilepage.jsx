import React from 'react'

const Studentprofilepage = () => {
  return (
    <div className="flex border rounded-lg bg-sky-100 shadow-md overflow-hidden">
      <div className="w-1/3 p-8">
      <img 
          src="https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true" 
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
        <h2 className="text-xl font-bold mb-4">Dhruv Bharatkumar Mali</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Student Status:</span>
            <span className="w-1/2">Active</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Admission No.:</span>
            <span className="w-1/2">230184</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Admission Year:</span>
            <span className="w-1/2">2023-24</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Roll No.:</span>
            <span className="w-1/2">1AUA23BCS040</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Degree:</span>
            <span className="w-1/2">Undergraduate</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Department:</span>
            <span className="w-1/2">Faculty of Engineering Sciences and Technology</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Semester:</span>
            <span className="w-1/2">SEMESTER - III</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Course Name:</span>
            <span className="w-1/2">B. Tech. in Computer Science and Engineering (AI-ML)</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">College:</span>
            <span className="w-1/2">ADANI UNIVERSITY</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Curriculum Plan:</span>
            <span className="w-1/2">BTech-CSE(AI-ML)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studentprofilepage
