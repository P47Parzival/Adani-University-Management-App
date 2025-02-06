import React from 'react'
import Landingpage from './Pages/Landingpage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Studentdashboardpage from './Pages/Studentdashboardpage'
import Admindashboardpage from './Pages/Admindashboardpage'
import Professordashboardpage from './Pages/Professordashboardpage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path='/studentdashboardpage' element={<Studentdashboardpage />}></Route>
          <Route path='/admindashboardpage' element={<Admindashboardpage />} />
          <Route path='/professordashboardpage' element={<Professordashboardpage />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
