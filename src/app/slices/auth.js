// redux
import { createSlice } from '@reduxjs/toolkit';

// apis
import authApi from '../services/jhinimal/authApi';
import userApi from '../services/jhinimal/userApi';

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
        state.token = payload.data.id_token;
      })
      .addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.user = payload.data;
      });
  },
});

// actions
export const { setToken, logout } = slice.actions;

// selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default slice.reducer;
