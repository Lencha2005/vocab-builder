import { configureStore } from '@reduxjs/toolkit';
import dictionarySlice from '@/redux/dictionary/slice';
import userWordsSlice from '@/redux/userWords/slice';
import filtersSlice from '@/redux/filters/slice';

export const store = configureStore({
  reducer: {
    dictionary: dictionarySlice,
    userWords: userWordsSlice,
    filters: filtersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
