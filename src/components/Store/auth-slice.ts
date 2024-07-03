import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
}

const initialState: AuthState = {
  isLoggedIn: Cookies.get("isLoggedIn") === "true" || false,
  accessToken: Cookies.get("accessToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      const token = action.payload;
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("accessToken", token, { expires: 7 });
      state.isLoggedIn = true;
      state.accessToken = token;
    },
    logout(state) {
      Cookies.remove("isLoggedIn");
      Cookies.remove("accessToken");
      state.isLoggedIn = false;
      state.accessToken = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
