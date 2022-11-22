import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    tileSelect: { x: null, z: null, data: null },
    topMenuSelect: null,
    weather: "sun",
    modalCheck: null,
  },
  reducers: {
    handleTile: (state, action) => {
      const { x, z, data } = action.payload;
      if (state.tileSelect.x === x && state.tileSelect.z === z) {
        state.tileSelect = { x: null, z: null, data: null };
      } else {
        state.tileSelect = { x: x, z: z, data: data };
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
