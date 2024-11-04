import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import userReducer from './slices/userSlice';
import gameReducer from './slices/gameSlice';

import { setupListeners } from '@reduxjs/toolkit/query';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuración de redux-persist
const persistConfig = {
  key: 'root', // La clave de almacenamiento
  storage // El almacenamiento a utilizar
};

// Crea un reducer persistente para auth
const persistedAuthReducer = persistReducer(persistConfig, userReducer);
const persistedGameReducer = persistReducer(persistConfig, gameReducer);

export const store = configureStore({
  reducer: {
    users: persistedAuthReducer,
    game: persistedGameReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
