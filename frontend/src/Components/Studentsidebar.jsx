import React, { useState } from 'react';

const Studentsidebar = ({ setActivepage, activePage }) => {
  const menuItems = ['Profile', 'My Attendance', 'New assignments','Billing', 'Results', 'Calendar', 'Register Complains', 'Settings', 'chatbot'];

  return (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`w-full text-left p-2 rounded ${
            activePage === item 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          } dark:text-white`}
          onClick={() => setActivepage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Studentsidebar;
