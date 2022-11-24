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
      ip_amount: 0,
      crop_count: 0,
      crop_per: 0,
      play_time: 0,
      created_at: null,
      token: null,
    },
    bag: [],
    tile: [],
  },
  reducers: {
    myInfoSave: (state, action) => {
      const {
        address,
        user_nick,
        user_id,
        user_pfp,
        created_at,
        haes_sal_amount,
        ip_amount,
        crop_count,
        crop_per,
        play_time,
      } = action.payload.data;
      state.myInfo.id = user_id || state.myInfo.id;
      state.myInfo.nickName = user_nick || state.myInfo.nickName;
      state.myInfo.address = address || state.myInfo.address;
      state.myInfo.profileImg = user_pfp || state.myInfo.profileImg;
      state.myInfo.haetsal = haes_sal_amount || state.myInfo.haetsal;
      state.myInfo.ip_amount = ip_amount || state.myInfo.ip_amount;
      state.myInfo.token = action.payload.token || state.myInfo.token;
      state.myInfo.created_at = created_at || state.myInfo.created_at;
      state.myInfo.crop_count = crop_count || state.myInfo.crop_count;
      state.myInfo.crop_per = crop_per || state.myInfo.crop_per;
      state.myInfo.play_time = play_time || state.myInfo.play_time;
    },
    bagUpdate: (state, action) => {
      state.bag = action.payload.bag;
    },
    tileUpdate: (state, action) => {
      state.tile = action.payload.tile;
    },
  },
});

export default userSlice;
export const { myInfoSave, bagUpdate, tileUpdate } = userSlice.actions;
