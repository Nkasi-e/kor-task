/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../common/api";
import { AuthProperties } from "../../models/user-model";
import axios from "axios";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/signup",
  async (userData: AuthProperties, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/auth/signup/`, userData);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },

    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = localStorage.setItem(
          "userInfo",
          JSON.stringify(action.payload.data)
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { setCredentials, reset } = authSlice.actions;
export default authSlice.reducer;
