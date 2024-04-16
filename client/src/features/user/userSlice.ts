/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  UserProperties,
  UserUpdateStatus,
  NotificationProperties,
  BlockUserId,
  ReportUserId,
} from "../../models/user-model";
import axios from "axios";
import { url } from "../../common/api"; // set to env when on production for best practices

const initialState = {
  users: [] as UserProperties[],
  user: {} as UserProperties,
  notification: [] as NotificationProperties[],
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

export const getNotifications = createAsyncThunk(
  "notifications",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/users/${userId}/notifications`);
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

export const block = createAsyncThunk(
  "blockUser",
  async (payload: { userId: string; blockUserData: BlockUserId }, thunkAPI) => {
    const { userId, blockUserData } = payload;
    try {
      const response = await axios.patch(
        `${url}/users/${userId}/block`,
        blockUserData
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

export const reportContent = createAsyncThunk(
  "reportContent",
  async (
    payload: { userId: string; reportUserData: ReportUserId },
    thunkAPI
  ) => {
    const { userId, reportUserData } = payload;
    try {
      const response = await axios.patch(
        `${url}/users/${userId}/report`,
        reportUserData
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
      state.notification = [] as NotificationProperties[];
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
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notification = action.payload.data;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(block.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(block.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(block.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(reportContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reportContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(reportContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
