import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Address from './Address'
import UserCartItemWrapper from '@/components/shopping-view/cart-wrapper'
import UserCartContainer from '@/components/shopping-view/cart-items-container'
import { loadStripe } from '@stripe/stripe-js';
import { createOrder } from '@/store/shop/order-slice'

const CheckOut = () => {
  const date = new Date();

  const [sessionId, setSessionId] = useState(null)
  const [currentSelectedAdddress, setCurrentSelectedAddress] = useState(null)
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingcart)
  const { AddressList } = useSelector(state => state.addressCart)
  const dispatch = useDispatch()

  let Totalcost = cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((acc, cartItem) => acc + (cartItem.salePrice > 0 ? cartItem.salePrice * cartItem.quantity : cartItem.price * cartItem.quantity), 0) : <p>0</p>


  async function handlepayment() {
    const stripe = await loadStripe("pk_test_51QwkBAGYJlXEbupCrBr1Qh41iOpS6RystPM4N6ivAQ30RwQGv96BEEviRY1VjeIUQBLavjwT72HGbA10yCuxmgRQ00e1dWm1yi")

    const OrderDetails = {
      userId: user.id,
      cartItems: cartItems.items && cartItems.items.length > 0 ? cartItems.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.price,
        salePrice: cartItem?.salePrice,
        quantity: cartItem?.quantity
      })) : [],
      addressInfo: {
        addressId: currentSelectedAdddress?._id,
        address: currentSelectedAdddress?.address,
        city: currentSelectedAdddress?.city,
        pincode: currentSelectedAdddress?.pincode,
        phone: currentSelectedAdddress?.phone,
        notes: currentSelectedAdddress?.notes
      },
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount: Totalcost,
      orderDate: date.toLocaleDateString('en-GB').replace(/\//g, '-'),
      orderUpdateDate: date.toLocaleDateString('en-GB').replace(/\//g, '-'),

    }

    currentSelectedAdddress._id !== null ?
      dispatch(createOrder(OrderDetails)).then((data) => {
        if (data?.payload?.success) {

          const result = stripe.redirectToCheckout({
            sessionId: data.payload.id
            
          })

          if (result.error) {
            console.log(result.error)
          }
        }
      })
      : null
    console.log(OrderDetails)
  }

  // useEffect(() => {

  // }, [currentSelectedAdddress])


  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center text-4xl font-HeadFont mt-3'>
        <span>Welcome to CheckOut Page {user?.username}</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} currentSelectedAdddress={currentSelectedAdddress} />
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
          <div className='flex flex-col items-center'>
            <button onClick={handlepayment} disabled={!currentSelectedAdddress} className='bg-[#682c0d] w-full hover:bg-[#682b0de5] text-white rounded-md font-HeadFont p-1 md:p-1 md:text-sm lg:p-2 lg:text-sm cursor-pointer'>CheckOut With Stripe</button>
            {
              !currentSelectedAdddress ? <div className='text-red-500 font-HeadFont text-base mt-2'>For Continue Payment Please Select Address First</div> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
