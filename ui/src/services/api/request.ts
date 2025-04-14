import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T | null;
  message: string;
};

const client = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
});

const request = async <T = unknown>( options: AxiosRequestConfig ): Promise<ApiResponse<T>> => {
  //client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;

  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;

    if (axiosError.response && axiosError.response.data) {
      // If the backend sent a structured ApiResponse error
      return axiosError.response.data;
    }

    // Fallback in case there's no response (e.g., network error)
    return {
      status: 'error',
      data: null,
      message: axiosError.message || 'Unexpected error',
    };
  }
};

export default request;
