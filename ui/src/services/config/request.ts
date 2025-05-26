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



const request = async <T = unknown>( options: AxiosRequestConfig ): Promise<ApiResponse<T>> => {
  if(localStorage.getItem('access_token') != null){
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
 

  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;

  
    // Fallback in case there's no response (e.g., network error)
    return {
      status: 'error',
      data: null,
      message: axiosError.message || 'Unexpected error',
    };
  }
};

export default request;


// src/api/request.ts

// export type ApiResponse<T> = {
//   status: 'success' | 'error';
//   data: T | null;
//   message: string;
// };

// const request = async <T = unknown>(
//   options: AxiosRequestConfig
// ): Promise<ApiResponse<T>> => {
//   try {
//     const response = await axiosInstance.request<ApiResponse<T>>(options);
//     return response.data;
//   } catch (error) {
//     const axiosError = error as AxiosError<ApiResponse<any>>;

//     if (axiosError.response?.data) {
//       return axiosError.response.data;
//     }

//     return {
//       status: 'error',
//       data: null,
//       message: axiosError.message || 'Unexpected error',
//     };
//   }
// };

// export default request;

