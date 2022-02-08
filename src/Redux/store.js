import { configureStore } from "@reduxjs/toolkit";
import sideNavReducer from "./sidenav";
// import topnavTitleReducer from "./topnavTitle";

export default configureStore({
  reducer: {
    sidenav: sideNavReducer,
    // navTitle: topnavTitleReducer,
  },
});
