import { createSlice, current } from "@reduxjs/toolkit";

const init = {
  up: false,
  right: false,
  down: false,
  left: false,
};

const characterSlice = createSlice({
  name: "characterSlice",
  initialState: {
    up: false,
    right: false,
    down: false,
    left: false,
  },
  reducers: {
    keyDownE: (state, action) => {
      const key = action.payload.key;
      state[key] = true;
    },
    keyUpE: (state, action) => {
      const key = action.payload.key;
      state[key] = false;
    },
  },
});

export default characterSlice;
export const { keyDownE, keyUpE } = characterSlice.actions;
