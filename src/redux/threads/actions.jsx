import { createAction } from '@reduxjs/toolkit';

import { getAllThreadsErrorTestTwo } from '../../utils/fetch';

export const setThreads = createAction('threads/setThreads');
export const setDetailThread = createAction('threads/setDetailThread');
export const createThreads = createAction('threads/createThreads');
export const addComment = createAction('threads/addComment');

export const fetchAllThreads = () => async (dispatch) => {
  try {
    const res = await getAllThreadsErrorTestTwo();
    const dataThreads = res.data.threads;
    dispatch(setThreads(dataThreads));
  } catch (error) {
    console.error('Get All Threads Error:', error);
  }
};
