import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createAdminAccount } from '../api/user';
import { AxiosError} from 'axios';
import { ApiResponse, User, UserResponseDto } from 'src/types';


export const useCreateAdminAccount = (
    options?: UseMutationOptions<ApiResponse<UserResponseDto>, AxiosError, User>
  ) => {
    return useMutation<ApiResponse<UserResponseDto>, AxiosError, User>({
      mutationFn: createAdminAccount,
      ...options,
    });
  };