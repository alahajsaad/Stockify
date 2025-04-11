import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T | null;
  message: string;
};

const client = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
});

const request = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;

  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    const message =
      err.response?.data && typeof err.response.data === 'object' && 'message' in err.response.data
        ? (err.response.data as any).message
        : err.message || 'An unknown error occurred';

    return {
      status: 'error',
      data: null,
      message,
    };
  }
};

export default request;
