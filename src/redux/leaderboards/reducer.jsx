import { createReducer } from '@reduxjs/toolkit';
import { setLeaderboards } from './actions';

const initialState = {
  leaderboards: [],
};

const leaderboardsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLeaderboards, (state, action) => {
    state.leaderboards = action.payload;
  });
});

export default leaderboardsReducer;
