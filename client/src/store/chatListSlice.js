import { createSlice, current } from "@reduxjs/toolkit";

const chatList = createSlice({
  initialState: [],
  name: "chatList",
  reducers: {
    setChatList: (state, { payload }) => payload.chatList,
    markMessagesInChatRoomAsRead: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );
      state[chatRoomIndex].unreadMessagesCount = 0;
    },
    IncreaseMessageCountInChatRoom: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );
      state[chatRoomIndex].unreadMessagesCount += 1;
    },
    setLatestMessage: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );
      const chatRoom = {
        ...currentState[chatRoomIndex],
        latestMessage: payload.latestMessage,
      };

      return [chatRoom].concat(
        currentState.filter((_, index) => index !== chatRoomIndex)
      );
    },
    updateMessageStatus: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );

      if (currentState[chatRoomIndex]?.latestMessage._id !== payload.messageId)
        return;

      state[chatRoomIndex].latestMessage[payload.status] = true;
    },
    setChatMode: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );
      state[chatRoomIndex].mode = payload.mode;
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
