import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import friendRequestReducer from "../features/friendRequest/friendRequestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friendRequest: friendRequestReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
