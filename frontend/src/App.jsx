import React from 'react'
import Landingpage from './Pages/Landingpage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Studentdashboardpage from './Pages/Studentdashboardpage'
import Admindashboardpage from './Pages/Admindashboardpage'
import Professordashboardpage from './Pages/Professordashboardpage'
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
        <Router>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path='/studentdashboardpage' element={<Studentdashboardpage />} />
            <Route path='/admindashboardpage' element={<Admindashboardpage />} />
            <Route path='/professordashboardpage' element={<Professordashboardpage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
