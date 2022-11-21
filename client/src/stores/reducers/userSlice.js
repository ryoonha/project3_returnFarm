import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    myInfo: { nickName: null, token: null },
    bag: [],
  },
  reducers: {
    myInfoSave: (state, action) => {
      state.myInfo.nickName = action.payload.nickName;
      state.myInfo.token = action.payload.token;
    },
    bagUpdate: (state, action) => {
      state.bag = action.payload.bag;
    },
  },
});

export default userSlice;
export const { myInfoSave, bagUpdate } = userSlice.actions;
