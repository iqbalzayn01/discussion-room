import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import threadsReducer from "./threadsSlice";
import leaderboardsReducer from "./leaderboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
  },
});
