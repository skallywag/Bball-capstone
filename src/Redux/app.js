import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideNav: false,
  isLoggedIn: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSideNav: (state, action) => {
      state.showSideNav = action.payload;
    },
    closeSideNav: (state) => {
      state.showSideNav = false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    loginUser: (state) => {
      state.isLoggedIn = !isLoggedIn;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleSideNav,
  showSidenav,
  isLoggedIn,
  setIsLoggedIn,
  closeSideNav,
  loginUser,
} = appSlice.actions;

export default appSlice.reducer;
