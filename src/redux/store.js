import { configureStore } from '@reduxjs/toolkit';
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
import { postDetailsReducer } from './postDetailsReducer';
import { commentsReducer } from './commentsReducer';

const postDetailsPersistConfig = {
  key: 'postDetails',
  storage,
  whitelist: ['countValue'],
};
const commentsPersistConfig = {
  key: 'comments',
  storage,
  whitelist: ['whateverYouWantToPersistInComments'], // Приблизно такий же принцип як для postDetails
};
export const store = configureStore({
  reducer: {
    postDetails: persistReducer(postDetailsPersistConfig, postDetailsReducer),
    comments: persistReducer(commentsPersistConfig, commentsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
