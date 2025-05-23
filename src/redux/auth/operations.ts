import { getErrorMessage } from '@/utils/getErrorMessage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LoginCredentials, RegisterCredentials } from '../types/types';
import authInstance from '@/api/authInstance';

export const setToken = (token: string) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = '';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData: RegisterCredentials, thunkAPI) => {
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      setToken(data.token);
      console.log('data: ', data);
      Cookies.set('token', data.token, { expires: 7 });
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
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
      Cookies.set('token', data.token, { expires: 7 });
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = Cookies.get('token');
    console.log('token: ', token);

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided to refresh user data');
    }

    try {
      setToken(token);
      const { data } = await authInstance.get('/users/current');
      Cookies.set('token', data.token);
      return { ...data, token };
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.post('/users/signout');
      console.log('data: ', data);

      clearToken();
      Cookies.remove('token');
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
