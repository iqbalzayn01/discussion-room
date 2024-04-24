import { createAction } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../utils/fetch';

export const setLeaderboards = createAction('leaderboards/setLeaderboards');

export const fetchLeaderboards = () => async (dispatch) => {
  try {
    const res = await getLeaderboards();
    const dataLeaderboards = res.data.leaderboards;
    dispatch(setLeaderboards(dataLeaderboards));
  } catch (error) {
    console.error('Get Leaderboards Error:', error);
  }
};
