import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  GetWordsResponse,
  WordItem,
  createWord,
  getAllWords,
  getCategories,
} from './operations';

interface DictionaryState {
  items: WordItem[];
  categories: string[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  error: string | null;
}

const handlePending = (state: DictionaryState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: DictionaryState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? 'Unknown error';
};

const INITIAL_STATE: DictionaryState = {
  items: [],
  categories: [],
  totalPages: 0,
  currentPage: 1,
  perPage: 0,
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
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
      .addCase(
        getAllWords.fulfilled,
        (state, action: PayloadAction<GetWordsResponse>) => {
          state.isLoading = false;
          state.items = action.payload.results;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.page;
          state.perPage = action.payload.perPage;
          state.error = null;
        }
      )
      .addCase(createWord.pending, handlePending)
      .addCase(
        createWord.fulfilled,
        (state, action: PayloadAction<WordItem>) => {
          state.isLoading = false;
          state.items.push(action.payload);
          state.error = null;
        }
      )
      .addCase(createWord.rejected, handleRejected)
      .addCase(getAllWords.rejected, handleRejected)
      .addCase(getCategories.pending, handlePending)
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
          state.error = null;
        }
      )
      .addCase(getCategories.rejected, handleRejected),
});

export const { setCurrentPage, resetWords } = dictionarySlice.actions;
export default dictionarySlice.reducer;
