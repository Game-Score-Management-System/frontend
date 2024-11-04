import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  token: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      console.log('action', action);
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    }
  }
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
