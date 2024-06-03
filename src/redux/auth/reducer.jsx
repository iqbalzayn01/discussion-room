import { createReducer } from '@reduxjs/toolkit';
import { addUser, setToken, clearToken, setUsers, setOneUser } from './actions';

const initialState = {
  users: [],
  user: {},
  token: localStorage.getItem('token') || '',
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.users.push(action.payload);
    })
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    })
    .addCase(clearToken, (state) => {
      state.token = '';
      localStorage.removeItem('token');
    })
    .addCase(setUsers, (state, action) => {
      state.users = action.payload;
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    });
});

export default authReducer;
