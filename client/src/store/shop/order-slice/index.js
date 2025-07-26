import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    OrderDetails: null,
    isLoading: false
};

export const createOrder = createAsyncThunk(
    'order/createorder',
    async (OrderDetails) => {
        console.log(OrderDetails)
        const response = await axios.post(
            "https://ecommerce-api-e50w.onrender.com/api/shop/order/create-checkout-session",
            OrderDetails,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response?.data;
    }
);

const OrderDetailSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.OrderDetails = action.payload?.data;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.OrderDetails = [];
            });
    }
});

export default OrderDetailSlice.reducer;
