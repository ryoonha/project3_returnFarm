import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    tileSelect: { x: null, z: null, data: null, seed: false },
    itemSelect: null,
    topMenuSelect: null,
    sellToggle: false,
    weather: "sun",
    modalCheck: "",
    rightClick: [false, false, false],
  },
  reducers: {
    handleTile: (state, action) => {
      const { x, z, data, seed } = action.payload;
      if (state.tileSelect.x === x && state.tileSelect.z === z) {
        state.tileSelect = { x: null, z: null, data: null, seed: false };
      } else {
        state.tileSelect = { x: x, z: z, data: data, seed: seed };
      }
    },
    handleItem: (state, action) => {
      if (
        state.itemSelect === action.payload.itemNum ||
        action.payload.itemNum === null
      ) {
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
    handleMouse: (state, action) => {
      state.rightClick = action.payload.on;
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
  handleMouse,
} = stateSlice.actions;
