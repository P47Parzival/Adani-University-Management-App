import React from 'react';

const ProfessorSidebar = ({ setActivePage, activePage }) => {
  const menuItems = ['Profile', 'Upload Attendance', 'Upload Assignments', 'Upload Grades', 'Settings'];

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
          onClick={() => setActivePage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ProfessorSidebar;
