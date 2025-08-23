import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/api/api";


const initialState = {
    isLoading: false,
    AddressList: []
}


export const addnewAddress = createAsyncThunk('/address/Addnew',
    async (formData) => {
        const response = await axiosClient.post("shop/address/addAddress", formData)

        return response?.data
    })

export const fetchAddresses = createAsyncThunk('/address/fetchAddress',
    async (userId) => {
        const response = await axiosClient.get(`shop/address/fetchAddress/${userId}`)

        return response?.data
    })

export const editAddress = createAsyncThunk('/address/editAddress',
    async ({ userId, addressId, formData }) => {
        const response = await axiosClient.put(`shop/address/updateAddress/${userId}/${addressId}`, formData)

        return response?.data
    }
)


export const deleteAddress = createAsyncThunk('/address/deleteAddress',
    async ({ userId, addressId }) => {
        const response = await axiosClient.delete(`shop/address/deleteAddress/${userId}/${addressId}`)

        return response?.data
    }
)


const AddressCartSlice = createSlice({
    name: "addressCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addnewAddress.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addnewAddress.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.AddressList = action.payload.data
            })
            .addCase(addnewAddress.rejected, (state, action) => {
                state.isLoading = false,
                    state.AddressList = []
            })
            .addCase(fetchAddresses.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.AddressList = action.payload.data
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.isLoading = false,
                    state.AddressList = []
            })
            .addCase(editAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.AddressList = action.payload.data
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.isLoading = false,
                    state.AddressList = []
            })
            .addCase(deleteAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.AddressList = action.payload.data
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false,
                    state.AddressList = []
            })
    }
})

export default AddressCartSlice.reducer 
