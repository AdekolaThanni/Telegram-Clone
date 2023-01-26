import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: { user: {} },
  name: "user",
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
