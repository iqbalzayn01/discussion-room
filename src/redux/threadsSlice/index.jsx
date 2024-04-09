import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
  detailThread: {},
};

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    setDetailThread: (state, action) => {
      state.detailThread = action.payload;
    },
    createThreads: (state, action) => {
      state.threads.push(action.payload);
    },
    addComment: (state, action) => {
      state.detailThread.comments.unshift(action.payload);
    },
  },
});

export const { setThreads, setDetailThread, createThreads, addComment } =
  threadsSlice.actions;

export default threadsSlice.reducer;
