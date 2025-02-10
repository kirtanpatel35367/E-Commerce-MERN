import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

const Shoppinglayout = () => {
    return (
        <div className='felx flex-col bg-white overflow-hidden '>
            {/* Shopping Header */}
            <ShoppingHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default Shoppinglayout
