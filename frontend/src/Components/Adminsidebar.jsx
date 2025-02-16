import React, { useState } from 'react';

const Adminsidebar = ({ setActivepage, activePage }) => {
  const menuItems = ['Profile', 'Manage Students', 'Manage Faculty', 'Upload calender','Reports', 'View Complains', 'Settings'];

  return (
    <div className="space-y-2 ">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`w-full text-left p-2 rounded ${
            activePage === item 
              ? 'bg-blue-100 text-blue-800' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setActivepage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Adminsidebar;