import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidenav: false,
};

export const sidenavSlice = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    handleClick: (state, action) => {
      state.sidenav = action.payload;
    },
    handleLinkChange: (state, action) => {
      state.sidenav = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleClick, sidenav, handleLinkChange } = sidenavSlice.actions;

export default sidenavSlice.reducer;
