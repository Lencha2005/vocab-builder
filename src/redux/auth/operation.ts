import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const authInstance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const setToken = (token: string) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = '';
};

// const extractErrorMessage = (error: unknown): string => {
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return String(error);
// };

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData: RegisterCredentials, thunkAPI) => {
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      setToken(data.token);
      console.log('data: ', data);
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData: LoginCredentials, thunkAPI) => {
    try {
      const { data } = await authInstance.post('/users/signin', formData);
      setToken(data.token);
      console.log('data: ', data);
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (token === null) {
      return thunkAPI.rejectWithValue('No token provided to refresh user data');
    }

    try {
      setToken(token);
      const { data } = await authInstance.get('/users/current');
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await authInstance.post('/users/signout');
    console.log('data: ', data);

    clearToken();
    return data;
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});
