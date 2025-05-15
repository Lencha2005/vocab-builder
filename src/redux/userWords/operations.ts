import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstance } from '../auth/operations';
import { getErrorMessage } from '@/utils/getErrorMessage';
import {
  AnswerWordDto,
  DeleteWordResponse,
  GetTasksResponse,
  GetWordsParams,
  GetWordsResponse,
  StatisticsResponse,
  TrainingWord,
  WordItem,
} from '../types/types';

export const getUserWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  { rejectValue: string }
>('userWords/getUserWords', async (params = {}, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetWordsResponse>('/words/own', {
      params,
    });
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addWordById = createAsyncThunk<
  WordItem,
  string,
  { rejectValue: string }
>('userWords/addById', async (id, thunkApi) => {
  try {
    const { data } = await authInstance.post<WordItem>(`/words/add/${id}`);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const updateWordById = createAsyncThunk<
  WordItem,
  { id: string; formData: Omit<WordItem, '_id'> },
  { rejectValue: string }
>('userWords/editById', async ({ id, formData }, thunkApi) => {
  try {
    const { data } = await authInstance.patch<WordItem>(
      `/words/edit/${id}`,
      formData
    );
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const deleteWordById = createAsyncThunk<
  DeleteWordResponse,
  string,
  { rejectValue: string }
>('userWords/deleteById', async (id, thunkApi) => {
  try {
    const { data } = await authInstance.delete<DeleteWordResponse>(
      `/words/delete/${id}`
    );
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const getStatistics = createAsyncThunk<
  StatisticsResponse,
  void,
  { rejectValue: string }
>('userWords/getStatistics', async (_, thunkApi) => {
  try {
    const { data } =
      await authInstance.get<StatisticsResponse>('/words/statistics');
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getTasks = createAsyncThunk<
  GetTasksResponse,
  void,
  { rejectValue: string }
>('userWords/getTasks', async (_, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetTasksResponse>('/words/tasks');
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addAnswers = createAsyncThunk<
  TrainingWord[],
  AnswerWordDto[],
  { rejectValue: string }
>('userWords/addAnswers', async (answers, thunkApi) => {
  try {
    const { data } = await authInstance.post<TrainingWord[]>(
      '/words/answers',
      answers
    );
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
