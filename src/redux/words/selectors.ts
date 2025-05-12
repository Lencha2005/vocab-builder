import { RootState } from '../store';

export const selectWords = (state: RootState) => state.words.items;
export const selectUserWords = (state: RootState) => state.words.userItems;
export const selectTotalPages = (state: RootState) => state.words.totalPages;
export const selectCurrentPage = (state: RootState) => state.words.currentPage;
export const selectCurrentPages = (state: RootState) => state.words.perPage;
export const selectIsLoading = (state: RootState) => state.words.isLoading;
export const selectErrorUser = (state: RootState) => state.words.error;
