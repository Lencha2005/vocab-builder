import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getAllWords } from './operations';

export interface WordItem {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
}

interface WordsState {
  items: WordItem[];
  userItems: WordItem[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  error: unknown;
}

const handlePending = (state: WordsState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: WordsState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE: WordsState = {
  items: [],
  userItems: [],
  totalPages: 0,
  currentPage: 1,
  perPage: 0,
  isLoading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage(state) {
      state.currentPage = state.currentPage + 1;
    },
    resetWords(state) {
      state.items = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.perPage = 0;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getAllWords.pending, handlePending)
      .addCase(getAllWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.perPage = action.payload.perPage;
        state.error = null;
      })
      .addCase(getAllWords.rejected, handleRejected),
});

export const { setCurrentPage, resetWords } = wordsSlice.actions;
export default wordsSlice.reducer;
