import React, { useState } from 'react';
import Professorheader from '../Components/Professorheader';
import Professorsidebar from '../Components/Professorsidebar';
import Professorprofilepage from '../Subpages/Professor/Professorprofilepage';


const ProfessorDashboardPage = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div>
      <Professorheader />
      <div className='flex justify-center pt-4'>
        <div className='w-1/3 pl-10'>
          <Professorsidebar setActivePage={setActivePage} activePage={activePage} />
        </div>
        <div className='w-2/3 pr-10'>
          {activePage === 'Profile' && <Professorprofilepage />}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboardPage;
