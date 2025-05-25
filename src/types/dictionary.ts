import { WordItem } from './word';

export interface GetWordsResponse {
  results: WordItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetWordsParams {
  keyword?: string;
  category?: string;
  isIrregular?: boolean | null;
  page?: number;
  limit?: number;
}

export interface DictionaryState {
  items: WordItem[];
  categories: string[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  error: string | null;
}
