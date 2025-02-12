import React from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { Button } from '../ui/button';


const Adminheader = () => {
    return (
        <div className='flex items-center justify-between opacity-95 bg-slate-800 p-3  '>
            <Button className='lg:hidden sm:block '>
                <CgMenuLeftAlt />
                <span className='sr-only'>Toggle Menu</span>
            </Button>
            <div className='flex flex-1 justify-end'>
                <Button className='inline-flex gap-2 bg-slate-50 text-slate-800 items-center rounded-md'>
                    <IoIosLogOut />
                    Log Out
                </Button>
            </div>

        </div>
    )
}

export default Adminheader
