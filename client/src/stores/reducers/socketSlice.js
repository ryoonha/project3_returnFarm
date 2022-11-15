import { createSlice, current } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: {
    userList: [],
    chatList: [],
  },
  reducers: {
    handleUser: (state, action) => {
      state.userList = action.payload.user;
    },
    handleChat: (state, action) => {
      state.chatList.push(action.payload.chat);
    },
  },
});

export default socketSlice;
export const { handleUser, handleCharacter, handleChat, handleChaSelect } =
  socketSlice.actions;
