import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
    modalReducer,
  },
});

export default store;
