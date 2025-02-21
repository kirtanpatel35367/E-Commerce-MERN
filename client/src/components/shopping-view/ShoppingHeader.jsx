import React, { useEffect, useState } from 'react';
import ShopLogo from '../../assets/shoplogo.png';
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import { shoppingViewHeaderMenuItems } from '@/config';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem } from '../ui/dropdown-menu';
import { UserLogout } from '../../store/auth-slice/index'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import UserCartItemWrapper from './cart-wrapper';
import { fetchCartItems } from '@/store/shop/cart-slice';



const MenuItems = () => {
  return (
    <nav className="flex flex-col lg:flex-row lg:gap-5 gap-2 mb-3 lg:mb-0 lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shoppingcart)
  const navigate = useNavigate()
  const [openCartsheet, setOpenCartSheet] = useState(false)

  const handleLogout = () => {
    dispatch(UserLogout());
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])

  return (
    <div className="flex md:text-slate-800  lg:items-center lg:flex-row flex-col gap-4">


      <Sheet open={openCartsheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon">
          <div className='relative'>
              <div className='absolute w-4 h-4 bg-red-600 rounded-full -top-3 left-2.5 items-center flex justify-center text-white'>{cartItems.items?.length}</div>
            <HiOutlineShoppingCart className="w-6 h-6" />
          </div>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartItemWrapper cartItems={cartItems && cartItems?.items?.length > 0 ? cartItems.items : []} />
      </Sheet>



      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUserCircle className="text-white w-6 h-6 hidden lg:block" />
            <span className="text-white hidden lg:block">{user?.username}</span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" sideOffset={15} className="w-40 gap-4">
          <DropdownMenuLabel onClick={() => navigate('/shop/useraccount')} className='hover:bg-slate-700 cursor-pointer hover:text-white rounded-md'>
            <div>
              <span className='flex gap-2'><CgProfile className='flex w-5 h-5' />Your Space</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={handleLogout} className="cursor-pointer w-30 hover:bg-slate-700 rounded-md hover:text-white">
            <span className='flex gap-2' ><IoMdLogOut className='flex w-5 h-5' />Logout
            </span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isAuthanticated, user } = useSelector(state => state.auth)

  const handleToggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-[#682c0d]">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center">
            <img src={ShopLogo} className="w-28 h-auto filter invert grayscale" />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center text-white font-HeadFont">
            <MenuItems />
          </div>
          {
            isAuthanticated ? <div className='hidden lg:block'> <HeaderRightContent /></div> : null
          }

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex justify-center lg:hidden sm:block items-center"
                onClick={handleToggleSheet}
              >
                <TiThMenu className="h-6 w-6" />
                <span className="sr-only">Toggle Header Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div>
                <MenuItems />
                <HeaderRightContent />
              </div>

            </SheetContent>
          </Sheet>

        </div>
      </header>
    </>
  );
};

export default ShoppingHeader;
