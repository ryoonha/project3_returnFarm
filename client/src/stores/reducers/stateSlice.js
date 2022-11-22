import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    tileSelect: [],
    topMenuSelect: null,
    weather: "sun",
    modalCheck: null,
  },
  reducers: {
    handleTile: (state, action) => {
      if (state.tileSelect.length === 0) {
        state.tileSelect = action.payload.pos;
      } else {
        state.tileSelect = [];
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
    modalChange: (state, action) => {
      state.modalCheck = action.payload.change;
    },
  },
});

export default stateSlice;
export const { handleTile, handleTopMenu, weatherChange, modalChange } =
  stateSlice.actions;
