import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
