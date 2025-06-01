import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import authInstance from '@/lib/axios/authInstance';
import {
  GetWordsParams,
  GetWordsResponse,
  WordItem,
  AnswerWordDto,
  DeleteWordResponse,
  GetTasksResponse,
  StatisticsResponse,
  AnswerResponse,
} from '@/types';

export const getUserWordsWithPagination = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  { rejectValue: string }
>('userWords/getUserWordsWithPagination', async (params = {}, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetWordsResponse>('/words/own', {
      params,
    });
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getAllUserWords = createAsyncThunk<
  GetWordsResponse,
  void,
  { rejectValue: string }
>('userWords/getAllUserWords', async (_, thunkApi) => {
  try {
    const { data } = await authInstance.get<GetWordsResponse>('/words/own', {
      params: { limit: 1000 },
    });
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
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addAnswers = createAsyncThunk<
  AnswerResponse[],
  AnswerWordDto[],
  { rejectValue: string }
>('userWords/addAnswers', async (answers, thunkApi) => {
  try {
    const { data } = await authInstance.post<AnswerResponse[]>(
      '/words/answers',
      answers
    );
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
