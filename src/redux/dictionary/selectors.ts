import { RootState } from '../store';

export const selectWords = (state: RootState) => state.dictionary.items;
export const selectCategories = (state: RootState) =>
  state.dictionary.categories;
export const selectTotalPages = (state: RootState) =>
  state.dictionary.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.dictionary.currentPage;
export const selectPerPages = (state: RootState) => state.dictionary.perPage;
export const selectDictionaryLoading = (state: RootState) =>
  state.dictionary.isLoading;
export const selectErrorUser = (state: RootState) => state.dictionary.error;
