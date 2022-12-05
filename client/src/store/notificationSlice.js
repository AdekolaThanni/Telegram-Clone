import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      const id = Date.now();
      state.push({
        ...payload,
        id,
      });
    },
    removeNotification: (state, { payload: id }) => {
      return state.filter((notif) => notif.id !== id);
    },
    clearAllNotifications: () => initialState,
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
