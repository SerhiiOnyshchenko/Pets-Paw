import { configureStore } from '@reduxjs/toolkit';
import petsReduser from './pets/pets-slice';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const petsPersistConfig = {
   key: 'pets',
   storage,
   whitelist: ['token'],
};

export const store = configureStore({
   reducer: {
      pets: persistReducer(petsPersistConfig, petsReduser),
   },
   middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
   ],
   devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
