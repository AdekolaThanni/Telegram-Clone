import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";
import chatReducer from "./chatSlice";
import userProfileReducer from "./userProfileSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
    chatReducer,
    userProfileReducer,
  },
});

export default store;
