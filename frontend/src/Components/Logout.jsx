import React from 'react';

const Logout = () => {

  const handleLogout = () => {
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div>
      <button className='border-2 border-black p-2 rounded-full' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;