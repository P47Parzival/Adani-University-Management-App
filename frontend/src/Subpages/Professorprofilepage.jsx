import React from 'react'

const Professorprofilepage = () => {
  return (
    <div className="flex border rounded-lg bg-sky-100 shadow-md overflow-hidden">
      <div className="w-1/3 p-8">
        <img 
          src="https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true" 
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
        <h2 className="text-xl font-bold mb-4">Professor Name</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Professor Status:</span>
            <span className="w-1/2">Active</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Employee ID:</span>
            <span className="w-1/2">654321</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Department:</span>
            <span className="w-1/2">Computer Science</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Role:</span>
            <span className="w-1/2">Professor</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Email:</span>
            <span className="w-1/2">professor@example.com</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Phone:</span>
            <span className="w-1/2">+0987654321</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Professorprofilepage
