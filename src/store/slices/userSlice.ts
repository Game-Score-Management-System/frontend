import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  email: '',
  token: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      sessionStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
      sessionStorage.removeItem('token');
    }
  }
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
