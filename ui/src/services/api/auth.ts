// src/api/auth.ts
import { useMutation } from "@tanstack/react-query";
import request from "./request";

import { ApiResponse, LoginRequest, LoginResponse, NewTokenResponse, PasswordResetRequestDto } from "src/types";



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

export const generateNewAccessToken = (refreshToken : string) :Promise<ApiResponse<NewTokenResponse>> =>{
   return request<NewTokenResponse>({
      url: `/auth/refresh${(refreshToken)}`,
      method: "post",
    });
}

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
