import React from 'react'
import { IoIosAnalytics } from "react-icons/io";


const Adminsidebar = () => {
  return (
    <>
      <aside className='hidden justify-center w-60 text-white lg:flex p-5 bg-slate-800 opacity-90'>
        <div className='flex text-center gap-3'>
          <IoIosAnalytics className='text-2xl' />
          <h1>Admin SideBar</h1>
        </div>

      </aside>
    </>
  )
}

export default Adminsidebar
