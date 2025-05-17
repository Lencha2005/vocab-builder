import { store } from '@/redux/store';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(
  config => {
    const token = store.getState().auth.user.token;
    console.log('token: ', token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      config.headers['Authorization'] = '';
    }

    return config;
  },
  error => Promise.reject(error)
);

export default authInstance;
