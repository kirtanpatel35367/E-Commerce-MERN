import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (productData) => {
        const response = await axios.post('https://ecommerce-api-e50w.onrender.com/api/admin/products/addProduct', productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response?.data
    }
)

export const fetchAllProducts = createAsyncThunk('/products/featchallproducts',
    async () => {
        const response = await axios.get('https://ecommerce-api-e50w.onrender.com/api/admin/products/fetchallproducts', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response?.data
    }
)

export const editProducts = createAsyncThunk(
    '/products/editproduct',
    async ({ id, productData }) => {
        const response = await axios.put(
            `https://ecommerce-api-e50w.onrender.com/api/admin/products/editproduct/${id}`,
            productData,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        return response?.data;
    }
);



export const deleteproduct = createAsyncThunk('/products/deleteproduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://ecommerce-api-e50w.onrender.com/api/admin/products/deleteproduct/${id}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete product");
        }
    }
);


const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewProduct.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false,
                    state.productList = action.payload
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false,
                    state.productList = []
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.productList = action.payload.data
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false,
                    state.productList = []
            })
            .addCase(editProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(editProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = []
            })
            .addCase(deleteproduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter(
                    (product) => product._id !== action.meta.arg
                );
            })
            .addCase(deleteproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
})



export default AdminProductSlice.reducer