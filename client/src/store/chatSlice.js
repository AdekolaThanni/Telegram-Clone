import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  //  Manages typing or recording state in order to make state changes for local user
  mode: null,
  // Manages chat room being displayed or not
  active: false,
  // saves chat room currently being displayed
  currentChatRoom: { chatProfile: {}, messageHistory: [] },
  // Saves all chat rooms
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
      const currentState = current(state);
      if (currentState.currentChatRoom._id === payload.chatRoomId) {
        state.currentChatRoom = { chatProfile: {}, messageHistory: {} };
      }

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
    setChatProfileMode: (state, { payload }) => {
      // Update mode in currentChatRoom
      const currentChatRoom = current(state.currentChatRoom);

      if (payload.id === currentChatRoom.chatProfile._id) {
        state.currentChatRoom.chatProfile.mode = payload.mode;
      }
    },
    updateMessageHistory: (state, { payload: { chatRoomId, message } }) => {
      // Get chatHistory
      const chatHistory = current(state.chatHistory);
      const currentChatRoom = current(state.currentChatRoom);
      // Get chat room
      const chatRoom = chatHistory[chatRoomId];

      if (!chatRoom) return;

      // Get last chatRoom day message
      const lastDayMessage =
        chatRoom.messageHistory[chatRoom.messageHistory.length - 1];
      // Get day message was sent
      const dayString = new Date(message.timeSent).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });

      const day = new Date(dayString).getTime();
      // Check if day is today
      if (lastDayMessage?.day === day) {
        // Add to object if day is today
        state.chatHistory[chatRoomId].messageHistory[
          chatRoom.messageHistory.length - 1
        ].messages.push(message);
      } else {
        // Else create new object for day
        const newDayObject = {
          day,
          messages: [message],
        };
        state.chatHistory[chatRoomId].messageHistory.push(newDayObject);
      }

      if (currentChatRoom._id === chatRoomId) {
        state.currentChatRoom.messageHistory = current(
          state.chatHistory[chatRoomId].messageHistory
        );
      }
    },
    updateMessageStatus: (
      state,
      { payload: { chatRoomId, messageId, day, status } }
    ) => {
      const messageHistory = current(
        state.chatHistory[chatRoomId].messageHistory
      );
      const dayMessagesIndex = messageHistory.findIndex(
        (dayMessage) => dayMessage.day === day
      );
      const messageIndex = messageHistory[dayMessagesIndex].messages.findIndex(
        (message) => message._id === messageId
      );

      // Update status
      state.chatHistory[chatRoomId].messageHistory[dayMessagesIndex].messages[
        messageIndex
      ][status] = true;

      // If room is the currentChatRoom
      const currentChatRoom = current(state.currentChatRoom);
      if (currentChatRoom._id === chatRoomId)
        state.currentChatRoom.messageHistory[dayMessagesIndex].messages[
          messageIndex
        ][status] = true;
    },
    resetChat: (state) => initialState,
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
