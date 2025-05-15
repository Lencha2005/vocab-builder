import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, registerUser } from './operations';
import { UserState } from '../types/types';

const handlePending = (state: UserState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: UserState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE: UserState = {
  user: {
    name: null,
    email: null,
    token: null,
  },
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
        };
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
        };
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = true;
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
        };
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.user = { name: null, email: null, token: null };
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, handleRejected),
});

export default authSlice.reducer;
