import React from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

const Adminlayout = () => {
    return (
        <>
            <div className='flex min-h-screen w-full'>
                <Adminsidebar />
                <div className='flex flex-1 flex-col'>
                    <Adminheader />
                    <main className='flex-1 flex p-4 md:p-6 bg-muted/90'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Adminlayout
