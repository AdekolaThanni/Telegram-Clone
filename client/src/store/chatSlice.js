import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload.mode;
    },
    resetMode: (state) => {
      state.mode = null;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
