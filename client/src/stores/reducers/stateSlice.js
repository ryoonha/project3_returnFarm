import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    userTest: null,
    tileSelect: false,
    pos: [null, null],
    oPos: {},

    openState: null,

    weather: "sun",
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
    userSaveF: (state, action) => {
      state.userTest = action.payload.user;
    },
    weatherChange: (state, action) => {
      state.weather = action.payload.change;
    },
  },
});

export default stateSlice;
export const { handleSelect, opneControl, userSaveF, weatherChange } =
  stateSlice.actions;
