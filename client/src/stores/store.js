import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import plantSlice from "./reducers/plantSlice";
import chatSlice from "./reducers/chatSlice";
import stateSlice from "./reducers/stateSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    plant: plantSlice.reducer,
    state: stateSlice.reducer,
    character: characterSlice.reducer,
    chat: chatSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
