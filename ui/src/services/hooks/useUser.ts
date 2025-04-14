import { useMutation, UseMutationOptions, useQuery , UseQueryOptions  } from '@tanstack/react-query';
import { createAdminAccount, getAdminInscriptionStatus } from '../api/user';
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