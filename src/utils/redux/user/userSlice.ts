import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
    dob: string;
    department: string;
    mobile: string;
    profilePicture: {};
    joiningDate: string;
  };
  authUser: string;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    dob: "",
    department: "",
    mobile: "",
    profilePicture: {},
    joiningDate: "",
  },
  authUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.authUser = action.payload.email;
    },
    addAuthUser: (state, action) => {
      state.authUser = action.payload.email;
    },
    removeUser: (state) => {
      state.authUser = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, addAuthUser } = userSlice.actions;

export default userSlice.reducer;
