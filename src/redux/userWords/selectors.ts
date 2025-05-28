import { RootState } from '../store';

export const selectUserWords = (state: RootState) => state.userWords.userItems;
export const selectWord = (state: RootState) => state.userWords.word;
export const selectTotalPages = (state: RootState) =>
  state.userWords.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.userWords.currentPage;
export const selectPerPages = (state: RootState) => state.userWords.perPage;
export const selectStatistics = (state: RootState) =>
  state.userWords.statistics;
export const selectTasks = (state: RootState) => state.userWords.tasks;
export const selectAnswers = (state: RootState) => state.userWords.answers;
export const selectUserWordsLoading = (state: RootState) =>
  state.userWords.isLoading;
export const selectErrorUser = (state: RootState) => state.userWords.error;
