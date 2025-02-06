import React from 'react'
import Adminheader from '../Components/Adminheader'
import Adminsidebar from '../Components/Adminsidebar'
import Professorprofilepage from '../Subpages/Professorprofilepage'

const Professordashboardpage = () => {
    return (
        <div>
            <Adminheader></Adminheader>
            <div className='flex justify-center pt-4'>
                <div className='w-1/3 pl-10 '>
                    <Adminsidebar />
                </div>
                <div className='w-2/3 pr-10'>
                    <Professorprofilepage />
                </div>
            </div>
        </div>
    )
}

export default Professordashboardpage
