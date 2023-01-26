import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";
import chatReducer from "./chatSlice";
import userProfileReducer from "./userProfileSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import contactsReducer from "./contactsSlice";
import userReducer from "./userSlice";
import socketReducer from "./socketSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
    chatReducer,
    userProfileReducer,
    authReducer,
    notificationReducer,
    contactsReducer,
    userReducer,
    socketReducer,
  },
});

export default store;
