import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { TokenService } from 'src/features/auth/components/AuthProvider';

export type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T | null;
  message: string;
};

// Create axios instance
const client = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
  withCredentials: true, // Important for cookies to be sent with requests
});

// Request interceptor for adding token
client.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    console.log("access_token from request interceptor "+token )
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    console.log("✅ Response received:");
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    return response;
  },
  function (error) {
    console.log("❌ Error occurred:", error.message);
    console.log("Error config:", error.config);

    // Network error handling
    if (error.message === "Network Error") {
      console.log("Attempting token refresh...");

      return axios
        .post("http://localhost:8088/api/v1/auth/refresh", {}, { withCredentials: true })
        .then((response) => {
          console.log("🔄 Refresh response headers:", response.headers);
          const newAccessToken = response.data.data.access_token;
          console.log("✅ New access token received:", newAccessToken);
          TokenService.setAccessToken(newAccessToken);
          // Retry original request
          return client(error.config);
        })
        .catch((refreshError) => {
          console.log("🔁 Refresh failed:", refreshError);
          return Promise.reject(refreshError);
        });
    }

    return Promise.reject(error);
  }
);


const request = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await client.request<ApiResponse<T>>(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;

    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    return {
      status: 'error',
      data: null,
      message: axiosError.message || 'Unexpected error',
    };
  }
};

export default request;

