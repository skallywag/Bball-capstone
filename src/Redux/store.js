import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app";

export default configureStore({
  reducer: {
    showSideNav: appReducer,
    isLoggedIn: appReducer,
  },
});
