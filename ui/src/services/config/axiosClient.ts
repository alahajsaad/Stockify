import { BASE_URL } from "@/lib/utils";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { TokenService } from "../api/auth/TokenService";

// Create a separate axios instance for refresh requests to avoid interceptor loops
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // this should used only with logout to send the cookie , you can use the refresh client
});


// Request interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)  // what does this line
);


function isTokenValid(bearerToken: string): boolean {
  try {
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      return false;
    }

    const token = bearerToken.split(' ')[1];
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return payload.exp > currentTime;
  } catch (error) {
    // If any error occurs (invalid format, decoding issue), consider token invalid
    return false;
  }
}


// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    console.log("response : "+response.headers)
    return response;
  },
 
  async function (error: AxiosError) {
    const originalRequest: any = error.config;
     const bearerToken = error.config.headers.Authorization;
    // You can add a 401 condition here if you want to refresh only on authorization failures
    if (error.message === 'Network Error' && !originalRequest._retry && !isTokenValid(bearerToken)) {
      originalRequest._retry = true;

      try {
        // Use refreshClient here
        const response = await refreshClient.post('/auth/refresh');
        console.log(response.data.data.access_token)
        if (response) {
          // Save the new access token
          TokenService.setAccessToken(response.data.data.access_token)

          // Update the authorization header for the retried request
          originalRequest.headers['Authorization'] = `Bearer ${response.data.data.access_token}`;

          // Retry the original request using the same client instance
          return refreshClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token request failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
// // Response interceptor
// client.interceptors.response.use(
//   (response) => {
//     console.log('Response interceptor - Success:', response.status);
//     return response;
//   },
//   async (error: AxiosError<any>) => {
//     const originalRequest: any = error.config;
    
//     console.log('Axios interceptor - Error type:', error.code);
//     console.log('Axios interceptor - Error message:', error.message);
//     console.log('Axios interceptor - Error status:', error.response?.status);
//     console.log('Axios interceptor - Error headers:', error.response?.headers);
//     console.log('Axios interceptor - Error data:', error.response?.data);
//     console.log('Axios interceptor - Request URL:', originalRequest?.url);
//     console.log('Axios interceptor - Request method:', originalRequest?.method);
//     console.log('Axios interceptor - Has response:', !!error.response);
//     console.log('Axios interceptor - Has request:', !!error.request);

//     // Only handle response errors (like 401), not network errors
//     if (!error.response) {
//       console.log('Network error or request cancelled, not handling token refresh');
//       return Promise.reject(error);
//     }

//     // Check if it's a token expiration error and the request hasn't been retried
//     if (isTokenExpired(error) && !originalRequest._retry) {
//       console.log('Token expired detected, attempting refresh...');
      
//       if (isRefreshing) {
//         console.log('Already refreshing, queuing request...');
//         // If already refreshing, queue this request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return client(originalRequest);
//         }).catch(err => {
//           return Promise.reject(err);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         console.log('Making refresh request...');
//         // The refresh token is automatically sent via cookies due to withCredentials: true
//         // No need to manually send refresh token in request body
//         const response = await refreshClient.post("/auth/refresh");
//         console.log('Refresh response:', response.data);

//         const { access_token } = response.data.data;
        
//         // Save new access token
//         TokenService.setAccessToken(access_token);
//         console.log('New access token saved');

//         // Update the authorization header for the original request
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
//         // Process queued requests
//         processQueue(null, access_token);
        
//         // Retry the original request
//         console.log('Retrying original request...');
//         return client(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         console.error("Refresh error response:", (refreshError as AxiosError)?.response?.data);
//         console.error("Refresh error status:", (refreshError as AxiosError)?.response?.status);
        
//         // Clear access token and redirect to login
//         TokenService.clearAccessToken();
//         processQueue(refreshError, null);
//         window.location.href = Paths.landingPage;
        
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     } else {
//       console.log('Not a token expiration error or already retried');
//     }

//     return Promise.reject(error);
//   }
// );



