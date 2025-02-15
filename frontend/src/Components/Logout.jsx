import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Logout = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className={`
        group
        relative
        px-8
        py-3
        rounded-lg
        text-base
        font-semibold
        transition-all
        duration-300
        transform
        hover:scale-105
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${darkMode 
          ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:focus:ring-offset-gray-800' 
          : 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400'
        }
        shadow-lg
        hover:shadow-xl
      `}
    >
      <span className="flex items-center space-x-2">
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </span>
    </button>
  );
};

export default Logout;