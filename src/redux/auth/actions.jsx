import { createAction } from '@reduxjs/toolkit';
import { getAllUsers, getUserLogged } from '../../utils/fetch';

export const setToken = createAction('auth/setToken');
export const clearToken = createAction('auth/clearToken');
export const setUsers = createAction('auth/setUsers');
export const setOneUser = createAction('auth/setOneUser');
export const addUser = createAction('auth/addUser');

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const res = await getAllUsers();
    const dataAllUsers = res.data.users;
    dispatch(setUsers(dataAllUsers));
  } catch (error) {
    console.error('Get All Users Error:', error);
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await getUserLogged();
    const dataUser = res.data.user;
    dispatch(setOneUser(dataUser));
  } catch (error) {
    console.error('Get One User Error:', error);
  }
};
