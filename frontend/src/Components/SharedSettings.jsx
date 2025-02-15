// src/Components/SharedSettings.jsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const SharedSettings = ({ userType, userData }) => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`p-6 ${darkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Theme Toggle */}
        <div className="mb-8 p-6 rounded-lg border dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Profile Information (Read-only) */}
        <div className="mb-8 p-6 rounded-lg border dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Email: </span>
              <span>{userData?.email}</span>
            </div>
            <div>
              <span className="font-semibold">Phone: </span>
              <span>{userData?.phone}</span>
            </div>
            <div>
              <span className="font-semibold">Role: </span>
              <span>{userType}</span>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="mb-8 p-6 rounded-lg border dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="flex justify-center mt-8">
         
        </div>
      </div>
    </div>
  );
};

export default SharedSettings;