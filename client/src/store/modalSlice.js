import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  visible: false,
  positions: {},
  payload: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state, { payload }) => {
      console.log(payload);
      state.type = null;
      state.positions = {};
      state.payload = {};
    },
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.positions = payload.positions;
      state.payload = payload.payload || {};
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
