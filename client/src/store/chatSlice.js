import { createSlice, current } from "@reduxjs/toolkit";

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
    removeChatRoom: (state, { payload }) => {
      state.currentChatRoom = { chatProfile: {}, messageHistory: {} };
      delete state.chatHistory[payload.chatRoomId];
    },
    updateChatProfile: (state, { payload: { payload } }) => {
      const currentChatRoom = current(state.currentChatRoom);
      // If user is currently displayed in chatRoom, update online status
      if (payload.id === currentChatRoom.chatProfile._id) {
        state.currentChatRoom.chatProfile = {
          ...currentChatRoom.chatProfile,
          ...payload,
        };
      }
      // Update user online status in chat history
      state.chatHistory[currentChatRoom._id] = {
        ...currentChatRoom,
        chatProfile: {
          ...currentChatRoom.chatProfile,
          ...payload,
        },
      };
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
