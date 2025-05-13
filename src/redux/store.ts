import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/redux/auth/slice';
import dictionarySlice from '@/redux/dictionary/slice';

export const store = configureStore({
  reducer: {
    dictionary: dictionarySlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
