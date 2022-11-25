import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    tileSelect: { x: null, z: null, data: null },
    itemSelect: null,
    topMenuSelect: null,
    sellToggle: false,
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
    handleItem: (state, action) => {
      if (state.itemSelect === action.payload.itemNum) {
        state.itemSelect = null;
      } else if (!state.itemSelect) {
        state.itemSelect = action.payload.itemNum;
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
    sellChange: (state, action) => {
      state.sellToggle = action.payload.change;
    },
  },
});

export default stateSlice;
export const {
  handleTile,
  handleItem,
  handleTopMenu,
  weatherChange,
  modalChange,
  sellChange,
} = stateSlice.actions;
