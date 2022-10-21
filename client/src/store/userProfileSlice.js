import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  profile: {},
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    showProfile: (state) => {
      state.visible = true;
    },
    hideProfile: (state) => {
      state.visible = false;
    },
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice.reducer;
