import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { BASE_URL } from 'src/lib/utils';


export type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T | null;
  message: string;
};

const client = axios.create({
  baseURL:   BASE_URL,
});







export const request = async <T = unknown>( options: AxiosRequestConfig ): Promise<ApiResponse<T>> => {
  if(localStorage.getItem('access_token') != null){
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
 

  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
   const axiosError = error as AxiosError<ApiResponse<any>>;

    // Extract the backend message if it exists
    const message = axiosError.response?.data?.message || axiosError.message || "Unexpected error";

    // Throw an error so React Query can catch it
    throw new Error(message);
  }
};

export const rawRequest = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<T> => {
  if (localStorage.getItem('access_token') != null) {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }

  try {
    const response = await client.request<T>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message =
      axiosError.response?.data?.message || axiosError.message || "Unexpected error";
    throw new Error(message);
  }
};



