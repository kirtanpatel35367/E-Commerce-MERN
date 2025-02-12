import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isAuthanticated: false,
    isLoading: false,
    user: null,
}

//CreateThunk For sending Data to API from Register Form
export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:9000/api/auth/register', formData, {
            withCredentials: true
        })
        //Message Return from APi Like sucess and messagef
        return response.data
    }
)

//CheckAuth Middleware
export const checkAuth = createAsyncThunk('/auth/check-auth',
    async () => {
        const response = await axios.get('http://localhost:9000/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache,must-revalidate,proxy-revalidate'
            }
        })
        return response.data
    }
)


export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axios.post('http://localhost:9000/api/auth/login', formData, {
            withCredentials: true
        })
        //Message Return from APi Like sucess and message
        return response.data
    }
)

//Auth Slicce 
const authSlice = createSlice({
    name: 'auth',
    initialState,

    //set User
    reducers: {
        setUser: (state, action) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.user = null
                state.isAuthanticated = false
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false,
                    state.user = null
                state.isAuthanticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.user = action.payload.sucess ? action.payload.user : null  //Data which API Response mean what createthunk is Respond Just Only Payload
                state.isAuthanticated = action.payload.sucess ? true : false
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false,
                    state.user = null
                state.isAuthanticated = false
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.user = action.payload.sucess ? action.payload.user : null  //Data which API Response mean what createthunk is Respond Just Only Payload
                state.isAuthanticated = action.payload.sucess ? true : false
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false,
                    state.user = null
                state.isAuthanticated = false
            })
    }
})



export const { setUser } = authSlice.actions
export default authSlice.reducer