import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authInstance;
