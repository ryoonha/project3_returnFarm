import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import modalSlice from "./reducers/modalSlice";
import plantSlice from "./reducers/plantSlice";
import socketSlice from "./reducers/socketSlice";
import stateSlice from "./reducers/stateSlice";

const store = configureStore({
  reducer: {
    plant: plantSlice.reducer,
    state: stateSlice.reducer,
    character: characterSlice.reducer,
    modal: modalSlice.reducer,
    socket: socketSlice.reducer,
  },
});

export default store;
