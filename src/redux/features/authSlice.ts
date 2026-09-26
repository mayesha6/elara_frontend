import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refresh_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; refresh_token?: string }>,
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.refresh_token) {
        state.refresh_token = action.payload.refresh_token;
      }
      if (typeof window !== "undefined") {
        const isProduction =
          process.env.NODE_ENV === "production" &&
          !window.location.hostname.includes("localhost") &&
          !window.location.hostname.includes("127.0.0.1");
        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const cookieOptions: Cookies.CookieAttributes = {
          domain: isProduction ? ".elara.com" : undefined,
          secure: isProduction,
          sameSite: "Lax",
          path: "/",
          ...(rememberMe ? { expires: 30 } : {}),
        };
        Cookies.set("accessToken", action.payload.token, cookieOptions);
        if (action.payload.refresh_token) {
          Cookies.set("refreshToken", action.payload.refresh_token, cookieOptions);
        }
      }
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{ refresh_token: string }>,
    ) => {
      state.refresh_token = action.payload.refresh_token;
      if (typeof window !== "undefined") {
        const isProduction =
          process.env.NODE_ENV === "production" &&
          !window.location.hostname.includes("localhost") &&
          !window.location.hostname.includes("127.0.0.1");
        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const cookieOptions: Cookies.CookieAttributes = {
          domain: isProduction ? ".elara.com" : undefined,
          secure: isProduction,
          sameSite: "Lax",
          path: "/",
          ...(rememberMe ? { expires: 30 } : {}),
        };
        Cookies.set("refreshToken", action.payload.refresh_token, cookieOptions);
      }
    },
    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        const isProduction =
          process.env.NODE_ENV === "production" &&
          !window.location.hostname.includes("localhost") &&
          !window.location.hostname.includes("127.0.0.1");
        const cookieOptions = {
          domain: isProduction ? ".elara.com" : undefined,
          path: "/",
        };
        Cookies.remove("accessToken", cookieOptions);
        Cookies.remove("refreshToken", cookieOptions);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    },

    initializeAuth: (state) => {
      const token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
      if (refreshToken) {
        state.refresh_token = refreshToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase("persist/REHYDRATE", (state) => {
      if (typeof window !== "undefined") {
        const token = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
        }
        if (refreshToken) {
          state.refresh_token = refreshToken;
        }
      }
    });
  },
});

export const { setUser, setRefreshToken, logout, initializeAuth } =
  authSlice.actions;

export default authSlice.reducer;
