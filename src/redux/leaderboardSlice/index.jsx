import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderboards: [],
};

export const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {
    setLeaderboards: (state, action) => {
      state.leaderboards = action.payload;
    },
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;

export default leaderboardsSlice.reducer;
