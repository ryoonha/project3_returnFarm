import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    myInfo: {
      id: null,
      nickName: null,
      address: null,
      profileImg: null,
      haetsal: 0,
      token_amount: 0,
      token: null,
      created_at: null,
    },
    bag: [],
  },
  reducers: {
    myInfoSave: (state, action) => {
      const {
        address,
        user_nick,
        user_id,
        user_pfp,
        created_at,
        token_amount,
      } = action.payload.data;
      state.myInfo.id = user_id || state.myInfo.id;
      state.myInfo.nickName = user_nick || state.myInfo.nickName;
      state.myInfo.address = address || state.myInfo.address;
      state.myInfo.profileImg = user_pfp || state.myInfo.profileImg;
      state.myInfo.haetsal = action.payload.haetsal || state.myInfo.haetsal;
      state.myInfo.token_amount = token_amount || state.myInfo.token_amount;
      state.myInfo.token = action.payload.token || state.myInfo.token;
      state.myInfo.created_at = created_at || state.myInfo.created_at;
      console.log(current(state));
    },
    bagUpdate: (state, action) => {
      state.bag = action.payload.bag;
    },
  },
});

export default userSlice;
export const { myInfoSave, bagUpdate } = userSlice.actions;
