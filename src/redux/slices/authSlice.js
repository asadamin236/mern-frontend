// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.Auth = action.payload;
    },
    clearAuth: (state) => {
      state.Auth = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
