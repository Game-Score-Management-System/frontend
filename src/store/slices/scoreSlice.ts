import { SCORE_DATA } from '@/app/lib/data';
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = SCORE_DATA;

export const scoreSlice = createSlice({
  name: 'scores',
  initialState: INITIAL_STATE,
  reducers: {}
});

export default scoreSlice.reducer;
