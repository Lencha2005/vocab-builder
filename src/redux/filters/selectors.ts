import { RootState } from '../store';

export const selectCategory = (state: RootState) => state.filters.category;
export const selectIsIrregular = (state: RootState) =>
  state.filters.isIrregular;
export const selectSearchTerm = (state: RootState) => state.filters.searchTerm;
