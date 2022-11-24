import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./reducers/characterSlice";
import gameSlice from "./reducers/gameSlice";
import stateSlice from "./reducers/stateSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    state: stateSlice.reducer,
    character: characterSlice.reducer,
    game: gameSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
