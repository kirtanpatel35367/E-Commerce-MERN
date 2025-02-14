import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

const Adminlayout = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className='flex min-h-screen max-w-full'>
                <Adminsidebar open={open} setOpen={setOpen} />
                <div className='flex flex-1 flex-col'>
                    <Adminheader setOpen={setOpen} />
                    <main className='flex-1 flex-col flex p-4 md:p-6 bg-muted/100 rounded-lg'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Adminlayout
