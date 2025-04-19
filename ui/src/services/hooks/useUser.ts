import { useMutation, UseMutationOptions, useQuery , UseQueryOptions  } from '@tanstack/react-query';
import { createAdminAccount, getAdminInscriptionStatus, getUserById } from '../api/user';
import { AxiosError} from 'axios';
import { AdminInscriptionStatus, ApiResponse, User, UserResponseDto } from 'src/types';


export const useCreateAdminAccount = (
    options?: UseMutationOptions<ApiResponse<UserResponseDto>, AxiosError, User>
  ) => {
    return useMutation<ApiResponse<UserResponseDto>, AxiosError, User>({
      mutationFn: createAdminAccount,
      ...options,
    });
  };

  export const useGetAdminInscriptionStatus = (
    id: number,
    options?: UseQueryOptions<ApiResponse<AdminInscriptionStatus>, AxiosError, ApiResponse<AdminInscriptionStatus>>,
  ) => {
    return useQuery<ApiResponse<AdminInscriptionStatus>, AxiosError, ApiResponse<AdminInscriptionStatus>>({
      queryKey: ['getAdminInscriptionStatus', id], // Type assertion to fix tuple issue
      queryFn: () => getAdminInscriptionStatus(id),
     ...options,
    });
  }

  export const useGetUserById = (
    id: number,
    options?: UseQueryOptions<ApiResponse<UserResponseDto>, AxiosError, ApiResponse<UserResponseDto>>,
  ) => {
    return useQuery<ApiResponse<UserResponseDto>, AxiosError, ApiResponse<UserResponseDto>>({
      queryKey: ['getUserById', id], // Type assertion to fix tuple issue
      queryFn: () => getUserById(id),
     ...options,
    });
  }