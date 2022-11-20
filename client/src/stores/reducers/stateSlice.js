import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    myInfo: { nickName: null, token: null },
    topMenuSelect: null,
    weather: "sun",
  },
  reducers: {
    myInfoSave: (state, action) => {
      state.myInfo.nickName = action.payload.nickName;
      state.myInfo.token = action.payload.token;
    },
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
    handleTopMenu: (state, action) => {
      const select = action.payload.select;
      if (state.topMenuSelect !== select) {
        state.topMenuSelect = select;
      } else {
        state.topMenuSelect = null;
      }
    },
    weatherChange: (state, action) => {
      state.weather = action.payload.change;
    },
  },
});

export default stateSlice;
export const { myInfoSave, handleSelect, handleTopMenu, weatherChange } =
  stateSlice.actions;
