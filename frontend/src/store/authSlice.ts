import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type AuthState = { token: string | null; user: User | null };

const initialState: AuthState = {
  token: localStorage.getItem("seatly.token"),
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLoaded(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    signedOut(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { signedIn, userLoaded, signedOut } = authSlice.actions;
