import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // To set the current page on  display in sidebar
  activePage: "chatList",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeActivePage: (state, { payload }) => {
      state.activePage = payload.newActivePage;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;
