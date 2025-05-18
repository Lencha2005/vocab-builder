import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FiltersState } from '../types/types';

const initialState: FiltersState = {
  category: '',
  isIrregular: null,
  searchTerm: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setIsIrregular(state, action: PayloadAction<boolean | null>) {
      state.isIrregular = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setIsIrregular, setSearchTerm, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
