import React from 'react'
import { useSelector } from 'react-redux'
import Address from './Address'
import UserCartItemWrapper from '@/components/shopping-view/cart-wrapper'
import UserCartContainer from '@/components/shopping-view/cart-items-container'

const CheckOut = () => {

  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingcart)

  let Totalcost = cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((acc, cartItem) => acc + (cartItem.salePrice > 0 ? cartItem.salePrice * cartItem.quantity : cartItem.price * cartItem.quantity), 0) : <p>0</p>

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center text-4xl font-HeadFont mt-3'>
        <span>Welcome to Profile Page {user?.username}</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address />
        <div className='flex flex-col gap-4'>
          {
            cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map((cartItem) =>
                <UserCartContainer key={cartItem.productId} cartItem={cartItem} />

              )
              : <div>No Items in Cart</div>
          }
          <div className="flex justify-between">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold">₹{Totalcost}</span>
          </div>
          <div>
            <button className='bg-[#682c0d] w-full hover:bg-[#682b0de5] text-white rounded-md font-HeadFont p-1 md:p-1 md:text-sm lg:p-2 lg:text-sm '>CheckOut With Paypal</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
