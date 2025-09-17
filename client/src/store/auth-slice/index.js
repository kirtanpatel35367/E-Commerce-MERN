import axiosClient from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthanticated: false,
  isLoading: true,
  user: null,
};

//CreateThunk For sending Data to API from Register Form
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const response = await axiosClient.post("auth/register", formData);
      //Message Return from APi Like success and messagef
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

//CheckAuth Middleware
export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      // Check if token exists in cookies before making API call
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("jwtToken=")
      );

      if (!tokenCookie) {
        // No token found, return unauthenticated state without API call
        return {
          success: false,
          message: "No token found",
        };
      }

      const response = await axiosClient.get("auth/check-auth");
      return response.data;
    } catch (error) {
      // Optional: Return meaningful error message
      return rejectWithValue(
        error.response?.data || { message: "Network error" }
      );
    }
  }
);

//LogOut User
export const UserLogout = createAsyncThunk("/auth/logout", async () => {
  const response = await axiosClient.post("auth/logout", {});

  return response.data;
});

//Login User
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const response = await axiosClient.post("auth/login", formData);
    //Message Return from APi Like success and message
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

//Auth Slicce
const authSlice = createSlice({
  name: "auth",
  initialState,

  //set User
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null); //Data which API Response mean what createthunk is Respond Just Only Payload
        state.isAuthanticated = action.payload.success ? true : false;
      })
      .addCase(loginUser.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null); //Data which API Response mean what createthunk is Respond Just Only Payload
        state.isAuthanticated = action.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(UserLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserLogout.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthanticated = false);
        console.log(state.isAuthanticated);
      })
      .addCase(UserLogout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
