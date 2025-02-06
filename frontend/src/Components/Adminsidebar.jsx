import React, { useState } from 'react';

const Adminsidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const menuItems = ['Dashboard', 'Manage Students', 'Manage Faculty', 'Reports', 'Settings', 'Professor Dashboard'];

  return (
    <div className="space-y-2 ">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`w-full text-left p-2 rounded ${
            activeItem === item 
              ? 'bg-blue-100 text-blue-800' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setActiveItem(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Adminsidebar;
