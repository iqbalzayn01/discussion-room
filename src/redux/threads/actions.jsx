import { createAction } from '@reduxjs/toolkit';

import { getAllThreads, getThread } from '../../utils/fetch';

export const setThreads = createAction('threads/setThreads');
export const setDetailThread = createAction('threads/setDetailThread');
export const createThreads = createAction('threads/createThreads');
export const addComment = createAction('threads/addComment');

export const allThreads = () => async (dispatch) => {
  try {
    const res = await getAllThreads();
    const dataThreads = res.data.threads;
    dispatch(setThreads(dataThreads));
  } catch (error) {
    console.error('Get All Threads Error:', error);
  }
};

export const fetchGetThread = (id) => async (dispatch) => {
  try {
    const res = await getThread(id);
    const dataThread = res.data.detailThread;

    dispatch(setDetailThread(dataThread));
  } catch (error) {
    console.error('Get One Thread Error:', error);
  }
};
