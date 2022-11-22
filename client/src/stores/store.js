import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import chatSlice from "./reducers/chatSlice";
import stateSlice from "./reducers/stateSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    state: stateSlice.reducer,
    character: characterSlice.reducer,
    chat: chatSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
