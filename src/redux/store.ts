import { configureStore } from '@reduxjs/toolkit';
import dictionarySlice from '@/redux/dictionary/slice';
import userWordsSlice from '@/redux/userWords/slice';

export const store = configureStore({
  reducer: {
    dictionary: dictionarySlice,
    userWords: userWordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
