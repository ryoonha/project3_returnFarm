import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    tileSelect: false,
    pos: [null, null],
    oPos: {},

    openState: null,
  },
  reducers: {
    handleSelect: (state, action) => {
      const [sx, sy] = state.pos;
      const { x, y } = action.payload.pos;
      if (sx === x && sy === y) {
        state.tileSelect = false;
        state.pos = [null, null];
        state.oPos = {};
      } else {
        state.tileSelect = true;
        state.pos = [x, y];
        state.oPos = action.payload.oPos;
      }
    },
    opneControl: (state, action) => {
      const select = action.payload.select;
      if (state.openState !== select) {
        state.openState = select;
      } else {
        state.openState = null;
      }
    },
  },
});

export default stateSlice;
export const { handleSelect, opneControl } = stateSlice.actions;
