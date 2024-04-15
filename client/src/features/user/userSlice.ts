/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userServices";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUsers = createAsyncThunk("auth/signup", async (_, thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.data) ||
      error.response.data.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUser = createAsyncThunk(
  "auth/signup",
  async (userId: string, thunkAPI) => {
    try {
      return await userService.getUser(userId);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "users/update",
  async (payload: { userId: string; statusData: any }, thunkAPI) => {
    const { userId, statusData } = payload;
    try {
      return await userService.updateStatus(userId, statusData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.user = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoading = true;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoading = true;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoading = true;
        state.users = action.payload.data;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
