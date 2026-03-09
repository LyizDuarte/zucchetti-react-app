import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message ?? error.message ?? 'Erro na requisição';
    return Promise.reject(new Error(message));
  },
);
