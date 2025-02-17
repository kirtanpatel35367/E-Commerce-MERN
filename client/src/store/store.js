import { configureStore } from "@reduxjs/toolkit";
import adminproductReducer from './admin/product-slice'
import shopProductReducer from './product-slice/index'
import authReducer from './auth-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminproducts: adminproductReducer,
        shopProducts: shopProductReducer
    }
})

export default store