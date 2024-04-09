import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  token: localStorage.getItem("token") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOneUser: (state, action) => {
      state.user = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { setToken, clearToken, setUsers, setOneUser, addUser } =
  authSlice.actions;

export default authSlice.reducer;
