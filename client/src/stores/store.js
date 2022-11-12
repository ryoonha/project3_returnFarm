import { configureStore } from "@reduxjs/toolkit";
import plantSlice from "./reducers/plantSlice";
import stateSlice from "./reducers/stateSlice";

const store = configureStore({
  reducer: {
    plant: plantSlice.reducer,
    state: stateSlice.reducer,
  },
});

export default store;
