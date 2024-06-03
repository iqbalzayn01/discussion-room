import { createAction } from '@reduxjs/toolkit';
import { register, login, getAllUsers, getUserLogged } from '../../utils/fetch';

export const addUser = createAction('auth/addUser');
export const setToken = createAction('auth/setToken');
export const clearToken = createAction('auth/clearToken');
export const setUsers = createAction('auth/setUsers');
export const setOneUser = createAction('auth/setOneUser');

export const signUp = (formData) => async (dispatch) => {
  try {
    const res = await register(formData);
    const dataUser = res.data;
    dispatch(addUser(dataUser));
  } catch (error) {
    console.error('Sign Up Error:', error);
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const res = await login(formData);
    const { token } = res.data;
    dispatch(setToken(token));
  } catch (error) {
    console.error('Error login:', error);
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    const res = await getAllUsers();
    const dataAllUsers = res.data.users;
    dispatch(setUsers(dataAllUsers));
  } catch (error) {
    console.error('Get All Users Error:', error);
  }
};

export const userLogged = () => async (dispatch) => {
  try {
    const res = await getUserLogged();
    const dataUser = res.data.user;
    dispatch(setOneUser(dataUser));
  } catch (error) {
    console.error('Get User Logged Error:', error);
  }
};
