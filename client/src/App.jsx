import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import Authlogin from './pages/auth/login';
import Authregister from './pages/auth/register';
import Adminlayout from './components/admin-view/layout';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/Product';
import AdminDashBoard from './pages/admin-view/DashBoard';
import Shoppinglayout from './components/shopping-view/layout';
import PageNotFound from './pages/page-not-found/PageNotFound';
import HomePage from './pages/shopping-view/HomePage';
import ProductListing from './pages/shopping-view/ProductListing';
import CheckOut from './pages/shopping-view/CheckOut';
import Accountpage from './pages/shopping-view/Accountpage';
import CheckAuth from './components/common/CheckAuth';
import Unauth from './pages/unAuthPage/Unauth';

const isAuthanticated = true;
const user = {
  role: 'user'
}


const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>Header Component</h1>

      {/* Authantication Part */}
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<Authlogin />} />
          <Route path='register' element={<Authregister />} />
        </Route>

        {/* Admin part  */}
        <Route path='/admin' element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <Adminlayout />
          </CheckAuth>
        }>
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='dashboard' element={<AdminDashBoard />} />
        </Route>

        {/* Shopping Part  */}
        <Route path='/shop' element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <Shoppinglayout />
          </CheckAuth>
        }>
          <Route path='home' element={<HomePage />} />
          <Route path='productList' element={<ProductListing />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='useraccount' element={<Accountpage />} />
        </Route>
        <Route path='/unauth' element={<Unauth />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
