import { createSlice, current } from "@reduxjs/toolkit";

const plantSlice = createSlice({
  name: "plantSlice",
  initialState: {
    plant: [],
    pos: [],
  },
  reducers: {
    push: (state, action) => {
      //   const { x, y } = action.payload.pos;
      //   state.pos.push([x, y]);
      //   console.log(state.plant);
    },
  },
});

export default plantSlice;
export const { push } = plantSlice.actions;
