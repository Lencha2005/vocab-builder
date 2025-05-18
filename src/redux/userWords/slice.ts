import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  DeleteWordResponse,
  GetTasksResponse,
  GetWordsResponse,
  StatisticsResponse,
  TrainingWord,
  UserWordsState,
  WordItem,
} from '../types/types';
import {
  addAnswers,
  addWordById,
  deleteWordById,
  getStatistics,
  getTasks,
  getUserWords,
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
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getUserWords.pending, handlePending)
      .addCase(
        getUserWords.fulfilled,
        (state, action: PayloadAction<GetWordsResponse>) => {
          state.isLoading = false;
          state.userItems = action.payload.results;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.page;
          state.perPage = action.payload.perPage;
          state.error = null;
        }
      )
      .addCase(getUserWords.rejected, handleRejected)
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
          state.tasks = action.payload.words;
          state.error = null;
        }
      )
      .addCase(getTasks.rejected, handleRejected)
      .addCase(addAnswers.pending, handlePending)
      .addCase(
        addAnswers.fulfilled,
        (state, action: PayloadAction<TrainingWord[]>) => {
          state.isLoading = false;
          state.answers = action.payload;
          state.error = null;
        }
      )
      .addCase(addAnswers.rejected, handleRejected),
});

export default userWordsSlice.reducer;
