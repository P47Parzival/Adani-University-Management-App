import React, { useState } from 'react';
import Professorheader from '../Components/Professorheader';
import Professorsidebar from '../Components/Professorsidebar';
import Professorprofilepage from '../Subpages/Professor/Professorprofilepage';
import Professoruploadgradespage from '../Subpages/Professor/Professoruploadgradespage';
import Professoruploadassignmentspage from '../Subpages/Professor/Professoruploadassignmentspage';
import Professoruploadattendancepage from '../Subpages/Professor/Professoruploadattendancepage';
import Professorsettingspage from '../Subpages/Professor/Professorsettingspage';


const ProfessorDashboardPage = () => {
  const [activePage, setActivePage] = useState('Profile');

  return (
    <div>
      <Professorheader />
      <div className='flex justify-center pt-4'>
        <div className='w-1/3 pl-10'>
          <Professorsidebar setActivePage={setActivePage} activePage={activePage} />
        </div>
        <div className='w-2/3 pr-10'>
          {activePage === 'Profile' && <Professorprofilepage />}
          {activePage === 'Upload Grades' && <Professoruploadgradespage />}
          {activePage === 'Upload Assignments' && <Professoruploadassignmentspage />}
          {activePage === 'Upload Attendance' && <Professoruploadattendancepage />}
          {activePage === 'Settings' && <Professorsettingspage />}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboardPage;
