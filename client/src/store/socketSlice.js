import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  initialState: {},
  name: "socket",
  reducers: {
    setSocket: (state, { payload }) => payload.socketServer,
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
