/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProperties, UserUpdateStatus } from "../../models/user-model";
import axios from "axios";
import { url } from "../../common/api"; // set to env when on production for best practices

const initialState = {
  users: [] as UserProperties[],
  user: {} as UserProperties,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllUsers = createAsyncThunk("/users", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/users/`);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.data) ||
      error.response.data.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUser = createAsyncThunk(
  "user/profile",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/users/${userId}`);
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

export const updateStatus = createAsyncThunk(
  "users/update",
  async (
    payload: { userId: string; statusData: UserUpdateStatus },
    thunkAPI
  ) => {
    const { userId, statusData } = payload;
    try {
      const response = await axios.patch(
        `${url}/users/${userId}/update`,
        statusData
      );
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.user = {} as UserProperties;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
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
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
