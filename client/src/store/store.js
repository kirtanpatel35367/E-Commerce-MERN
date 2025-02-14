import { configureStore } from "@reduxjs/toolkit";
import adminproductReducer from './admin/product-slice'
import authReducer from './auth-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminproducts: adminproductReducer,
    }
})

export default store