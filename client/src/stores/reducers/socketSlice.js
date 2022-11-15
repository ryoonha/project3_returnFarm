import { createSlice, current } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: {
    userList: [],
    characterList: [],
    chatList: [],

    chaSelect: "",
  },
  reducers: {
    handleUser: (state, action) => {
      state.userList = action.payload.userArray;
    },
    handleCharacter: (state, action) => {
      state.characterList = action.payload.characterData;
    },
    handleChat: (state, action) => {
      state.chatList.push(action.payload.chat);
    },
    handleChaSelect: (state, action) => {
      state.chaSelect = action.payload.select;
    },
  },
});

export default socketSlice;
export const { handleUser, handleCharacter, handleChat, handleChaSelect } =
  socketSlice.actions;
