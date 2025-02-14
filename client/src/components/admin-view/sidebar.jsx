import { adminSidebarMenuItems } from '@/config';
import React, { useState } from 'react';
import { IoIosAnalytics } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const AdminMenu = () => {
    return (
      <nav className="flex flex-col text-center items-start space-y-2 w-full font-HeadFont">
        {adminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path)
              setOpen(false)
            }}
            className="flex items-center gap-3 text-md h-12 px-4 mx-2 w-auto cursor-pointer rounded-md transition duration-300 
                      text-black hover:bg-slate-700 hover:text-white"
          >
            <menuItem.icon className="text-xl" />
            <span className="font-medium">{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 flex flex-col items-center justify-center text-center"
        >
          <div className="flex flex-col  h-full">
            <SheetHeader>
              <SheetTitle className="flex  mb-4 gap-3">
                <IoIosAnalytics className="text-3xl" />
                <h1 className="text-lg font-semibold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>

            <div className="w-full flex flex-col items-center justify-center">
              <AdminMenu />
            </div>
          </div>
        </SheetContent>
      </Sheet>


      <aside className="hidden lg:flex flex-col w-60 text-center text-white p-5 shadow-md shadow-slate-800 
                     bg-slate-800  gap-6 h-screen">

        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center justify-center gap-3 text-lg font-semibold 
                   hover:text-gray-300 transition duration-300">

          <IoIosAnalytics className="text-2xl" />
          <h1>Admin Panel</h1>
        </div>

        <div className="bg-white text-black rounded-md py-4 w-full shadow-sm">
          <AdminMenu />
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
