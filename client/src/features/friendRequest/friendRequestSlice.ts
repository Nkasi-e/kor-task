/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendRequestService from "./friendRequestServices";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const sendRequest = createAsyncThunk(
  "friend-request",
  async (requestData: any, thunkAPI) => {
    try {
      return await friendRequestService.sendRequest(requestData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "friend-request/accept",
  async (id: string, thunkAPI) => {
    try {
      return await friendRequestService.acceptRequest(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rejectRequest = createAsyncThunk(
  "friend-request/decline",
  async (id: string, thunkAPI) => {
    try {
      return await friendRequestService.rejectRequest(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.data) ||
        error.response.data.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(rejectRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
