import React from 'react'
import Landingpage from './Pages/Landingpage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Studentdashboardpage from './Pages/Studentdashboardpage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path='/studentdashboardpage' element={<Studentdashboardpage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
