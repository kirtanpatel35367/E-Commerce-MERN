import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}


export const fetchShopProducts = createAsyncThunk('/shop/products/getproducts',
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })

        const response = await axios.get(`https://ecommerce-api-e50w.onrender.com/api/shop/products/getproducts?${query}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)


export const getproductDetails = createAsyncThunk('/shop/product/productdetails',
    async (id) => {
        const response = await axios.get(`https://ecommerce-api-e50w.onrender.com/api/shop/products/productdetails/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    })

const ShopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetails = null
        }
    },
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
            .addCase(getproductDetails.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getproductDetails.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.productDetails = action.payload.data
            })
            .addCase(getproductDetails.rejected, (state, action) => {
                state.isLoading = false,
                    state.productDetails = null
            })
    }
})

export const { setProductDetails } = ShopProductSlice.actions
export default ShopProductSlice.reducer 
