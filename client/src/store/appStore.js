import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";
import chatReducer from "./chatSlice";
import userProfileReducer from "./userProfileSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
    chatReducer,
    userProfileReducer,
    authReducer,
    notificationReducer,
  },
});

export default store;
