import React from 'react'
import Studentheader from '../Components/Studentheader'
import Studentsidebar from '../Components/Studentsidebar'
import Studentprofilepage from '../Subpages/Studentprofilepage'

const Studentdashboardpage = () => {
    return (
        <div>
            <Studentheader />
            <div className='flex justify-center pt-4'>
                <div className='w-1/3 pl-10 '>
                    <Studentsidebar />
                </div>
                <div className='w-2/3 pr-10'>
                    <Studentprofilepage />
                </div>
            </div>
        </div>
    )
}

export default Studentdashboardpage
