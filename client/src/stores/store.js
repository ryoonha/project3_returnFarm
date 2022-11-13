import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import plantSlice from "./reducers/plantSlice";
import stateSlice from "./reducers/stateSlice";

const store = configureStore({
  reducer: {
    plant: plantSlice.reducer,
    state: stateSlice.reducer,
    character: characterSlice.reducer,
  },
});

export default store;
