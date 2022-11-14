import { createSlice, current } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    check: false,
  },
  reducers: {
    modalChange: (state, action) => {
      state.check = action.payload.change;
    },
  },
});

export default modalSlice;
export const { modalChange } = modalSlice.actions;
