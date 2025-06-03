import axios from 'axios';
import { getSession } from 'next-auth/react';

const authInstance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

authInstance.interceptors.request.use(
  async config => {
    const session = await getSession();

    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default authInstance;
