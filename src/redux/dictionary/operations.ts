import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { WordItem, GetWordsParams, GetWordsResponse } from '@/types';
import authInstance from '@/lib/axios/authInstance';

export const getAllWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  { rejectValue: string }
>('dictionary/getAll', async (params = {}, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetWordsResponse>('/words/all', {
      params,
    });
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
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('dictionary/getCategories', async (_, thunkApi) => {
  try {
    const { data } = await authInstance.get<string[]>('/words/categories');
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
