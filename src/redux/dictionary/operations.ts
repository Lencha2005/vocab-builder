import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstance } from '../auth/operations';
import { getErrorMessage } from '@/utils/getErrorMessage';

export interface WordItem {
  _id?: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner?: string;
  progress?: number;
}

export interface GetWordsResponse {
  results: WordItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetWordsParams {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}

export const getAllWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  { rejectValue: string }
>('dictionary/getAll', async (params = {}, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetWordsResponse>('/words/all', {
      params,
    });
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createWord = createAsyncThunk<
  WordItem,
  WordItem,
  { rejectValue: string }
>('dictionary/createWord', async (formData: WordItem, thunkApi) => {
  try {
    const { data } = await authInstance.post<WordItem>(
      '/words/create',
      formData
    );
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('categories/getAll', async (_, thunkApi) => {
  try {
    const { data } = await authInstance.get<string[]>('/words/categories');
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

// export const getStatistics = createAsyncThunk<
//   string[],
//   void,
//   { rejectValue: string }
// >('categories/getAll', async (_, thunkApi) => {
//   try {
//     const { data } = await authInstance.get<string[]>('/words/categories');
//     console.log('data: ', data);
//     return data;
//   } catch (error: unknown) {
//     return thunkApi.rejectWithValue(getErrorMessage(error));
//   }
// });

// export const addWordById = createAsyncThunk<
//   WordItem,
//   string,
//   { rejectValue: string }
// >('words/add', async (id, thunkApi) => {
//   try {
//     const { data } = await authInstance.post<WordItem>(`/words/add/${id}`);
//     return data;
//   } catch (error) {
//     return thunkApi.rejectWithValue(
//       error instanceof Error ? error.message : 'Unknown error'
//     );
//   }
// });
