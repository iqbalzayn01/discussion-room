import { combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import threadsReducer from '../threads/reducer';
import leaderboardsReducer from '../leaderboards/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadsReducer,
  leaderboards: leaderboardsReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
