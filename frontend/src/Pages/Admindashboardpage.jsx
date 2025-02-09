import React, { useState } from 'react';
import Adminheader from '../Components/Adminheader';
import Adminsidebar from '../Components/Adminsidebar';
import Adminprofilepage from '../Subpages/Admin/Adminprofilepage';
import Adminmanagestudentspage from '../Subpages/Admin/Adminmanagestudentspage';
import Adminmanagefaculty from '../Subpages/Admin/Adminmanagefacultypage';
import Adminreports from '../Subpages/Admin/Adminreportspage';
import Adminsettings from '../Subpages/Admin/Adminsettingspage';

const Admindashboardpage = () => {
  const [activePage, setActivepage] = useState('Profile');

  return (
    <div>
      <Adminheader />
      <div className='flex justify-center pt-4'>
        <div className='w-1/3 pl-10'>
          <Adminsidebar setActivepage={setActivepage} activePage={activePage} />
        </div>
        <div className='w-2/3 pr-10'>
          {activePage === 'Profile' && <Adminprofilepage />}
          {activePage === 'Manage Students' && <Adminmanagestudentspage />}
          {activePage === 'Manage Faculty' && <Adminmanagefaculty />}
          {activePage === 'Reports' && <Adminreports />}
          {activePage === 'Settings' && <Adminsettings />}
        </div>
      </div>
    </div>
  );
};

export default Admindashboardpage;
