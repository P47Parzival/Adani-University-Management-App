import React from 'react'
import Adminheader from '../Components/Adminheader'
import Adminsidebar from '../Components/Adminsidebar'
import Adminprofilepage from '../Subpages/Adminprofilepage'

const Admindashboardpage = () => {
    return (
        <div>
            <Adminheader></Adminheader>
            <div className='flex justify-center pt-4'>
                <div className='w-1/3 pl-10 '>
                    <Adminsidebar />
                </div>
                <div className='w-2/3 pr-10'>
                    <Adminprofilepage />
                </div>
            </div>
        </div>
    )
}

export default Admindashboardpage
