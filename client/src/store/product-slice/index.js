import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: []
}


export const fetchShopProducts = createAsyncThunk('/shop/products/getproducts',
    async () => {
        const response = await axios.get('http://localhost:9000/api/shop/products/getproducts', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)


const ShopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShopProducts.pending, (state, action) => {
            state.isLoading = true
        })
            .addCase(fetchShopProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.productList = action.payload.data
            })
            .addCase(fetchShopProducts.rejected, (state, action) => {
                state.isLoading = false,
                    state.productList = []
            })
    }
})


export default ShopProductSlice.reducer 
