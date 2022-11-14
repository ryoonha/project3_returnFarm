import { createSlice, current } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: {
    userList: [],
    characterList: [],
    chatList: [],
  },
  reducers: {
    handleUser: (state, action) => {
      state.userList = action.payload.userArray;
    },
    handleCharacter: (state, action) => {
      state.characterList.push(action.payload.characterData);
    },
    handleChat: (state, action) => {
      state.chatList.push(action.payload.chat);
    },
  },
});

export default socketSlice;
export const { handleUser, handleCharacter, handleChat } = socketSlice.actions;
