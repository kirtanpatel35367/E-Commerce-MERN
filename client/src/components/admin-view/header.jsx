import React from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogout } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast'



const Adminheader = ({ setOpen }) => {
    const { isAuthanticated } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const { toast } = useToast()

    const handleLogout = () => {
        dispatch(UserLogout()).then((response) => {
            if (response?.payload.success) {
                toast({
                    title: response.payload.message || "User LoggedOut Succesfully",
                    variant: "success"
                });
            }
            else {
                toast({
                    title: response.payload.message || "Error While LogOut",
                    variant: "destructive"
                });
            }
        })
    }

    return (
        <div className='flex items-center justify-between shadow-sm shadow-slate-800  bg-slate-800 p-3'>
            <Button onClick={() => setOpen(true)} className='lg:hidden sm:block'>
                <CgMenuLeftAlt />
                <span className='sr-only'>Toggle Menu</span>
            </Button>
            <div className='flex flex-1 text-center  justify-end'>
                <Button onClick={handleLogout} className='inline-flex gap-2 text-sm bg-slate-50 text-slate-800 items-center rounded-md hover:text-white'>
                    <IoIosLogOut />
                    Log Out
                </Button>
            </div>
        </div>
    )
}

export default Adminheader
