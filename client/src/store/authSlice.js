import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
  isNew: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
      localStorage.setItem("loggedIn", JSON.stringify(true));
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("loggedIn", JSON.stringify(false));
    },
    setUserIsNew: (state, { payload }) => {
      state.isNew = payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
