import React, { useState } from 'react';
import Adminheader from '../Components/Adminheader';
import Adminsidebar from '../Components/Adminsidebar';
import Adminprofilepage from '../Subpages/Admin/Adminprofilepage';

const Admindashboardpage = () => {
  const [activePage, setActivePage] = useState('Profile');

  return (
    <div>
      <Adminheader />
      <div className='flex justify-center pt-4'>
        <div className='w-1/3 pl-10'>
          <Adminsidebar setActivePage={setActivePage} activePage={activePage} />
        </div>
        <div className='w-2/3 pr-10'>
          {activePage === 'Profile' && <Adminprofilepage />}
        </div>
      </div>
    </div>
  );
};

export default Admindashboardpage;
