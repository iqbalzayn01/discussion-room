import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
};

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    createThreads: (state, action) => {
      state.threads.push(action.payload);
    },
  },
});

export const { setThreads, createThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
