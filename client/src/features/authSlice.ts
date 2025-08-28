import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk("auth/login", async (data: { email: string, password: string }) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
});

export const signup = createAsyncThunk("auth/signup", async (data: { username: string, email: string, password: string }) => {
  const res = await axios.post(`${API}/auth/signup`, data);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, status: "idle", error: null } as any,
  reducers: {
    logout: (state) => { state.user = null; state.token = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
