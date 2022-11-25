import { createSlice, current } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "gameSlice",
  initialState: {
    marketList: [],
    userList: [],
    chatList: [],
    sellData: null,
  },
  reducers: {
    handleMarketList: (state, action) => {
      state.marketList = action.payload.list;
    },
    handleUser: (state, action) => {
      state.userList = action.payload.user;
    },
    handleChat: (state, action) => {
      state.chatList.push(action.payload.chat);
    },
    handleSell: (state, action) => {
      state.sellData = action.payload.itemInfo;
    },
  },
});

export default gameSlice;
export const { handleMarketList, handleUser, handleChat, handleSell } =
  gameSlice.actions;
