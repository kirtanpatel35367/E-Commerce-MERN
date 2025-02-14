import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const initialState = {
    isLoding: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (productData) => {
        const response = await axios.post('http://localhost:9000/api/admin/products/addProduct', productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)

export const fetchAllProducts = createAsyncThunk('/products/featchallproducts',
    async () => {
        const response = await axios.get('http://localhost:9000/api/admin/products/fetchallproducts', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)

export const editProducts = createAsyncThunk('/products/editproduct',
    async (id, productData) => {
        const response = await axios.put(`http://localhost:9000/api/admin/products/editproduct/${id}`, productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)


export const deleteproduct = createAsyncThunk('/products/deleteproduct',
    async (id) => {
        const response = await axios.delete(`http://localhost:9000/api/admin/products/deleteproduct/${id}`, productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewProduct.pending, (state) => {
            state.isLoding = true
        })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoding = false,
                    state.productList = action.payload
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoding = false,
                    state.productList = []
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoding = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                console.log(action.payload.data)
                state.isLoding = false,
                    state.productList = action.payload.data
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoding = false,
                    state.productList = []
            })
            .addCase(editProducts.pending, (state, action) => {
                state.isLoding = true
            })
    }
})



export default AdminProductSlice.reducer