import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";
import chatReducer from "./chatSlice";
import userProfileReducer from "./userProfileSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
    chatReducer,
    userProfileReducer,
    authReducer,
  },
});

export default store;
