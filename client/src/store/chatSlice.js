import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
  active: false,
  currentChatRoom: { chatProfile: {}, messageHistory: {} },
  chatHistory: {},
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
    setChatActive: (state) => {
      state.active = true;
    },
    setChatUnactive: (state) => {
      state.active = false;
    },
    setChatRoom: (state, { payload }) => {
      state.currentChatRoom = payload.chatRoom;
    },
    addToChatRoomHistory: (state, { payload }) => {
      state.chatHistory[payload.chatRoomId] = payload.chatRoom;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
