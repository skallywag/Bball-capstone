import { configureStore } from "@reduxjs/toolkit";
import sideNavReducer from "./sidenav";

export default configureStore({
  reducer: {
    sidenav: sideNavReducer,
  },
});
