import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideNav: false,
};

export const sidenavSlice = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    handleClick: (state, action) => {
      state.showSideNav = action.payload;
    },
    handleLinkChange: (state) => {
      state.showSideNav = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleClick, showSidenav, handleLinkChange } =
  sidenavSlice.actions;

export default sidenavSlice.reducer;
