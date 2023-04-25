import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  getMenu: []
};
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenu: (state, action) => {
      state.getMenu= action.payload;
    }
  },
});
export const { addMenu } = menuSlice.actions;
export default menuSlice.reducer;