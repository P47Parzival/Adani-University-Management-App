import React from 'react'
import Enter from '../Components/Enter'
import { Link } from 'react-router-dom'

const Landingpage = () => {
  return (
    <div className='relative h-screen w-screen'>
      <div className='absolute inset-0'>
        <img className='object-cover h-full w-full' src="https://github.com/P47Parzival/Adani-University-Management-App/blob/main/frontend/src/assets/Adani_university_landing.png?raw=true" alt="Adani University Landing" />
      </div>
      <div className='absolute inset-0 flex items-center justify-center z-10 rounded-lg bg-black bg-opacity-50'>
        <Enter />
      </div>
    </div>
  )
}

export default Landingpage