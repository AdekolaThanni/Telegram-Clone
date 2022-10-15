import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
    chatReducer,
  },
});

export default store;
