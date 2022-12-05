import { createSlice, current } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "gameSlice",
  initialState: {
    nftList: [],
    marketList: [],
    userList: [],
    chatList: [],
    sellData: null,
    selectItem: [null, null],
    selectScroll: 0,
    backgroundSound: false,
  },
  reducers: {
    handleNftList: (state, action) => {
      state.nftList = action.payload.list;
    },
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
    handleItem: (state, action) => {
      state.selectItem = action.payload.item;
    },
    handleScroll: (state, action) => {
      state.selectScroll = action.payload.num;
    },
    handleBackgroundSound: (state, action) => {
      state.backgroundSound = !state.backgroundSound;
    },
  },
});

export default gameSlice;
export const {
  handleNftList,
  handleMarketList,
  handleUser,
  handleChat,
  handleSell,
  handleItem,
  handleScroll,
  handleBackgroundSound,
} = gameSlice.actions;
