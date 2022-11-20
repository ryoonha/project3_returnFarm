import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import modalSlice from "./reducers/modalSlice";
import plantSlice from "./reducers/plantSlice";
import chatSlice from "./reducers/chatSlice";
import stateSlice from "./reducers/stateSlice";

const store = configureStore({
  reducer: {
    plant: plantSlice.reducer,
    state: stateSlice.reducer,
    character: characterSlice.reducer,
    modal: modalSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
