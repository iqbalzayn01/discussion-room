import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import threadsReducer from "./threadsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
  },
});
