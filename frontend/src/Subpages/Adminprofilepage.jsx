import React from 'react'

const Adminprofilepage = () => {
  return (
    <div className="flex border rounded-lg bg-sky-100 shadow-md overflow-hidden">
      <div className="w-1/3 p-8">
        <img 
          src="https://github.com/P47Parzival/Tango-Chatapp/blob/main/Frontend/src/assests/face%20(1).png?raw=true" 
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
        <h2 className="text-xl font-bold mb-4">Admin Name</h2>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-1/2">Admin Status:</span>
            <span className="w-1/2">Active</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Employee ID:</span>
            <span className="w-1/2">123456</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Department:</span>
            <span className="w-1/2">Administration</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Role:</span>
            <span className="w-1/2">System Administrator</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Email:</span>
            <span className="w-1/2">admin@example.com</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-1/2">Phone:</span>
            <span className="w-1/2">+1234567890</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminprofilepage
