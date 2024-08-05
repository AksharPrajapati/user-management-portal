import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface";

const initialState: { user: IUser } = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuthUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
  },
});

export const { removeUser, addAuthUser } = userSlice.actions;

export default userSlice.reducer;
