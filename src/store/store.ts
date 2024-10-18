import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// import scoreReducer from './slices/scoreSlice';
import { apiSlice } from './services/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    users: userReducer,
    // scores: scoreReducer
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
