import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: { user: {} },
  name: "user",
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload.user);
      state.user = payload.user;
    },
    setUnreadMessage: (state, { payload: unreadMessage }) => {
      state.user.unreadMessages.push(unreadMessage);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
