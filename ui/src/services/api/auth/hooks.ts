import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse , LoginRequest , PasswordResetRequestDto , UpdatePasswordRequest} from "./types";
import { authenticate , forgetPassword , logout, refresh, resetPassword , updatePassword} from "./api";


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

export const useUpdatePassword = () => {
  return useMutation<ApiResponse<void>, Error, UpdatePasswordRequest>({
    mutationFn: (updatePasswordRequest: UpdatePasswordRequest) =>
      updatePassword(updatePasswordRequest).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};

export const useRefresh = () => {
  return useMutation<ApiResponse<LoginResponse>, Error>({
    mutationFn: () =>
      refresh().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};

export const useLogout = () => {
  return useMutation<ApiResponse<void>, Error>({
    mutationFn: () =>
      logout().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};