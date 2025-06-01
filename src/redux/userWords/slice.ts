import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  DeleteWordResponse,
  GetTasksResponse,
  StatisticsResponse,
  AnswerResponse,
  UserWordsState,
  GetWordsResponse,
  WordItem,
} from '@/types';
import {
  addAnswers,
  addWordById,
  deleteWordById,
  getAllUserWords,
  getStatistics,
  getTasks,
  getUserWordsWithPagination,
  updateWordById,
} from './operations';

const handlePending = (state: UserWordsState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: UserWordsState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? 'Unknown error';
};

const INITIAL_STATE: UserWordsState = {
  userItems: [],
  fullUserItems: [],
  word: null,
  totalPages: 0,
  currentPage: 1,
  perPage: 7,
  statistics: 0,
  tasks: [],
  answers: [],
  isLoading: false,
  error: null,
};

const userWordsSlice = createSlice({
  name: 'userWords',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetWords(state) {
      state.userItems = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.perPage = 0;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getUserWordsWithPagination.pending, handlePending)
      .addCase(
        getUserWordsWithPagination.fulfilled,
        (state, action: PayloadAction<GetWordsResponse>) => {
          state.isLoading = false;

          const newItems = action.payload.results;
          const oldItems = state.userItems;

          const isSame =
            oldItems.length === newItems.length &&
            oldItems.every((item, i) => item._id === newItems[i]._id);

          if (!isSame) {
            state.userItems = newItems;
          }
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.page;
          state.perPage = action.payload.perPage;
          state.error = null;
        }
      )
      .addCase(getUserWordsWithPagination.rejected, handleRejected)
      .addCase(getAllUserWords.pending, handlePending)
      .addCase(
        getAllUserWords.fulfilled,
        (state, action: PayloadAction<GetWordsResponse>) => {
          state.isLoading = false;
          state.fullUserItems = action.payload.results;
          state.error = null;
        }
      )
      .addCase(getAllUserWords.rejected, handleRejected)

      .addCase(addWordById.pending, handlePending)
      .addCase(
        addWordById.fulfilled,
        (state, action: PayloadAction<WordItem>) => {
          state.isLoading = false;
          state.userItems.push(action.payload);
          state.error = null;
        }
      )
      .addCase(addWordById.rejected, handleRejected)
      .addCase(updateWordById.pending, handlePending)
      .addCase(
        updateWordById.fulfilled,
        (state, action: PayloadAction<WordItem>) => {
          state.isLoading = false;
          state.userItems = state.userItems.map(word =>
            word._id === action.payload._id ? action.payload : word
          );
          state.word = action.payload;
          state.error = null;
        }
      )
      .addCase(updateWordById.rejected, handleRejected)
      .addCase(deleteWordById.pending, handlePending)
      .addCase(
        deleteWordById.fulfilled,
        (state, action: PayloadAction<DeleteWordResponse>) => {
          state.isLoading = false;
          state.userItems = state.userItems.filter(
            word => word._id !== action.payload.id
          );
          state.error = null;
        }
      )
      .addCase(deleteWordById.rejected, handleRejected)
      .addCase(getStatistics.pending, handlePending)
      .addCase(
        getStatistics.fulfilled,
        (state, action: PayloadAction<StatisticsResponse>) => {
          state.isLoading = false;
          state.statistics = action.payload.totalCount;
          state.error = null;
        }
      )
      .addCase(getStatistics.rejected, handleRejected)

      .addCase(getTasks.pending, handlePending)
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<GetTasksResponse>) => {
          state.isLoading = false;
          state.tasks = action.payload.tasks;
          state.error = null;
        }
      )
      .addCase(getTasks.rejected, handleRejected)
      .addCase(addAnswers.pending, handlePending)
      .addCase(
        addAnswers.fulfilled,
        (state, action: PayloadAction<AnswerResponse[]>) => {
          state.isLoading = false;
          state.answers = action.payload;
          state.error = null;
        }
      )
      .addCase(addAnswers.rejected, handleRejected),
});

export const { setCurrentPage, resetWords } = userWordsSlice.actions;

export default userWordsSlice.reducer;
