import { ApiResponse } from "@/types";
import { LoginRequest , LoginResponse , PasswordResetRequestDto , UpdatePasswordRequest} from "./types";
import { request } from "@/services/config/request";


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

export const updatePassword = (updatePasswordRequest : UpdatePasswordRequest): Promise<ApiResponse<void>> =>{
    return request<void>({
      url: "/auth/updatePassword",
      method: "post",
      data: updatePasswordRequest
    });
}

export const logout = (): Promise<ApiResponse<void>> =>{
    return request<void>({
      url: "/auth/logout",
      method: "post"
    });
}

export const refresh = (): Promise<ApiResponse<LoginResponse>> =>{
    return request<LoginResponse>({
      url: "/auth/refresh",
      method: "post"
    });
}

