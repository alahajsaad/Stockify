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
  if(localStorage.getItem('access_token') != null){
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
 

  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;

    if (axiosError.response && axiosError.response.data) {

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

// const request = async <T = unknown>(options: AxiosRequestConfig): Promise<ApiResponse<T>> => {
//   const token = localStorage.getItem('access_token');

//   const config: AxiosRequestConfig = {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   };

//   try {
//     const response = await client.request<ApiResponse<T>>(config);
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
