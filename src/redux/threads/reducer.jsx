import { createReducer } from '@reduxjs/toolkit';
import {
  setThreads,
  setDetailThread,
  createThreads,
  addComment,
} from './actions';

const initialState = {
  threads: [],
  detailThread: {},
};

const threadsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setThreads, (state, action) => {
      state.threads = action.payload;
    })
    .addCase(setDetailThread, (state, action) => {
      state.detailThread = action.payload;
    })
    .addCase(createThreads, (state, action) => {
      state.threads.push(action.payload);
    })
    .addCase(addComment, (state, action) => {
      state.detailThread.comments.unshift(action.payload);
    });
});

export default threadsReducer;
