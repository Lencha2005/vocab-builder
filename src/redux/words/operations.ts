import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstance } from '../auth/operations';
import { WordItem } from './slice';

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

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

export const getAllWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  { rejectValue: string }
>('words/getAll', async (params = {}, thunkApi) => {
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
