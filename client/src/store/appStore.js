import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";

const store = configureStore({
  reducer: {
    sidebarReducer,
  },
});

export default store;
