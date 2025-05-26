// src/api/auth.ts
import { useMutation } from "@tanstack/react-query";

import { ApiResponse, LoginRequest, LoginResponse, PasswordResetRequestDto } from "src/types";
import request from "../config/request";



export const authenticate = (user: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return request<LoginResponse>({
      url: "/auth/login",
      method: "post",
      data: user,
    });
};

export const forgetPassword = (email: string): Promise<ApiResponse<void>> => {
  return request<void>({
    url: `/auth/forgetPassword`,
    method: "post",
    data: { email },
  });
};


export const resetPassword = (passwordResetRequestDto : PasswordResetRequestDto): Promise<ApiResponse<void>> =>{
    return request<void>({
      url: "/auth/resetPassword",
      method: "post",
      data: passwordResetRequestDto
    });
}


// export const generateNewAccessToken = async (): Promise<ApiResponse<LoginResponse>> => {
//     try {
//       const { data }: AxiosResponse<LoginResponse> = await axios.post(`http://localhost:8088/api/v1/auth/refresh`);
//       localStorage.setItem('access_token', data.access_token);
//       console.log("from the generate new access token method : " + data)
//       return {
//         status: 'success',
//         data,
//         message: 'Token refreshed successfully'
//       };
//     } catch (error) {
//       console.error('Failed to refresh token:', error);
//       // Clear tokens on refresh failure
//       localStorage.removeItem('access_token');
//       // Force logout through the auth context
//       window.location.href = '/'; 
      
//       return {
//         status: 'error',
//         data: null,
//         message: 'Failed to refresh token'
//       };
//     }
// };




export const useAuthenticate = () => {
 return useMutation<ApiResponse<LoginResponse>,Error,LoginRequest>({
        mutationFn : (loginRequest : LoginRequest) => {
          return authenticate(loginRequest);
        }
      })
}

export const useForgetPassword = () => {
 // return type , error , parameter type
  return useMutation<ApiResponse<void>, Error, string>({
    mutationFn: (email: string) =>
      forgetPassword(email).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};
  
export const useResetPassword = () => {
 // return type , error , parameter type
  return useMutation<ApiResponse<void>, Error, PasswordResetRequestDto>({
    mutationFn: (passwordResetRequestDto: PasswordResetRequestDto) =>
      resetPassword(passwordResetRequestDto).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};
