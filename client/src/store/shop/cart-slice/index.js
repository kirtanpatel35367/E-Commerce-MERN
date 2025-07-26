import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    isLoading: false
}

export const addtoCart = createAsyncThunk('cart/addtocart',
    async ({ userId, productId, quantity }) => {
        const response = await axios.post('https://ecommerce-api-e50w.onrender.com/api/shop/cart/add', {
            userId, productId, quantity
        })

        return response?.data
    }
)

export const fetchCartItems = createAsyncThunk('cart/fetchcartitems',
    async (userId) => {
        const response = await axios.get(`https://ecommerce-api-e50w.onrender.com/api/shop/cart/get/${userId}`)

        return response?.data
    }
)


export const updateItemQuantity = createAsyncThunk('cart/updateItem',
    async ({ userId, productId, quantity }) => {
        const response = await axios.put('https://ecommerce-api-e50w.onrender.com/api/shop/cart/updateCart', {
            userId, productId, quantity
        })

        return response?.data
    }
)

export const deleteItem = createAsyncThunk('cart/deleteItem',
    async ({ userId, productId }) => {
        const response = await axios.delete(`https://ecommerce-api-e50w.onrender.com/api/shop/cart/deleteCart/${userId}/${productId}`)
        return response?.data
    }

)


const shoppingCartSlice = createSlice(({
    name: 'shoppingcart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addtoCart.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addtoCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data
            })
            .addCase(addtoCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })
            .addCase(updateItemQuantity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })


    }
}))


export default shoppingCartSlice.reducer 
