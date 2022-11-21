import { createSlice, current } from "@reduxjs/toolkit";

const characterSlice = createSlice({
  name: "characterSlice",
  initialState: {
    up: false,
    right: false,
    down: false,
    left: false,
    shift: false,
  },
  reducers: {
    keyDownE: (state, action) => {
      const key = action.payload.key;
      console.log(current(state).shift);
      if (!current(state).shift && key === "shift") {
        state.shift = true;
      } else if (current(state).shift && key === "shift") {
        state.shift = false;
      } else {
        state[key] = true;
      }
    },
    keyUpE: (state, action) => {
      const key = action.payload.key;
      state[key] = false;
    },
  },
});

export default characterSlice;
export const { keyDownE, keyUpE } = characterSlice.actions;
