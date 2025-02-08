import React, { useState } from 'react';
import Studentheader from '../Components/Studentheader';
import Studentsidebar from '../Components/Studentsidebar';
import Studentprofilepage from '../Subpages/Student/Studentprofilepage';
import Studentattendancepage from '../Subpages/Student/Studentattendancepage';
import Studentbillingpage from '../Subpages/Student/Studentbillingpage';
import Studentresultpage from '../Subpages/Student/Studentresultpage';
import Studentcalenderpage from '../Subpages/Student/Studentcalenderpage'

const Studentdashboardpage = () => {
    const [activePage, setActivepage] = useState('Profile');

    return (
        <div>
            <Studentheader />
            <div className='flex justify-center pt-4'>
                <div className='w-1/3 pl-10 '>
                    <Studentsidebar setActivepage={setActivepage} activePage={activePage} />
                </div>
                <div className='w-2/3 pr-10'>
                    {activePage === 'Profile' && <Studentprofilepage />}
                    {activePage === 'Attendance' && <Studentattendancepage />}
                    {activePage === 'Billing' && <Studentbillingpage />}
                    {activePage === 'Results' && <Studentresultpage />}
                    {activePage === 'Calendar' && <Studentcalenderpage />}
                </div>
            </div>
        </div>
    );
};

export default Studentdashboardpage;

