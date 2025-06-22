import { ApiResponse } from '@/types';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { client } from './axiosClient';

export const request = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;
    // Extract the backend message if it exists
    const message = axiosError.response?.data?.message || axiosError.message || "Unexpected error";
    throw new Error(message);
  }
};

export const rawRequest = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await client.request<T>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || axiosError.message || "Unexpected error";
    throw new Error(message);
  }
};