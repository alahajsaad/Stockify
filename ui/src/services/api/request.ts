// src/api/request.ts
import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
});

const request = async <T = unknown>(options: AxiosRequestConfig): Promise<T> => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
  const response = await client.request<T>(options);
  return response.data;
};

export default request;
