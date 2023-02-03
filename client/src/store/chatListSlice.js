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

      const remainingChatRooms = currentState.filter(
        (_, index) => index !== chatRoomIndex
      );

      // If chatRoom is pinned, put directly to the start of the array
      if (chatRoom.pinned) {
        return [chatRoom].concat(remainingChatRooms);
      }

      // Else find lastIndexOf last pinned chat and put chat room after it
      else {
        const newIndexOfChatRoom =
          remainingChatRooms.findLastIndex((chatRoom) => chatRoom.pinned) + 1;

        return [
          ...remainingChatRooms.slice(0, newIndexOfChatRoom),
          chatRoom,
          ...remainingChatRooms.slice(newIndexOfChatRoom),
        ];
      }
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
    pinOrUnpinChat: (state, { payload }) => {
      let currentState = current(state);

      currentState = currentState.map((chatRoom) =>
        Object.assign({}, chatRoom)
      );

      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );

      currentState[chatRoomIndex].pinned = payload.pinned;

      // Get pinned chats and sort based on latest message
      const pinnedChats = currentState
        .filter((chatRoom) => chatRoom.pinned)
        .sort((a, b) => {
          const latestMessageInATime = new Date(
            a.latestMessage.timeSent
          ).getTime();
          const latestMessageInBTime = new Date(
            b.latestMessage.timeSent
          ).getTime();

          return latestMessageInBTime - latestMessageInATime;
        });

      // Get unpinned chats and sort based on latest message
      const unpinnedChats = currentState
        .filter((chatRoom) => !chatRoom.pinned)
        .sort((a, b) => {
          const latestMessageInATime = new Date(
            a.latestMessage.timeSent
          ).getTime();
          const latestMessageInBTime = new Date(
            b.latestMessage.timeSent
          ).getTime();

          return latestMessageInBTime - latestMessageInATime;
        });

      // Concatenate both arrays and return as new state
      return pinnedChats.concat(unpinnedChats);
    },
    addToChatList: (state, { payload }) => {
      const currentState = current(state);

      if (
        currentState.some(
          (chatRoom) => chatRoom.chatRoomId === payload.newChat.chatRoomId
        )
      )
        return;
      else {
        state.push(payload.newChat);
      }
    },
    removeFromChatList: (state, { payload }) => {
      const currentState = current(state);
      const chatRoomIndex = currentState.findIndex(
        (chat) => chat.chatRoomId === payload.chatRoomId
      );

      state[chatRoomIndex].latestMessage = {};
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
