import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError} from 'axios';
import { ApiResponse } from 'src/types';
import { activateAccount } from '../api/accountActivation';


export const useActivateAccount = (options?: UseMutationOptions<ApiResponse<void>, AxiosError, string>) => {
    return useMutation<ApiResponse<void>, AxiosError, string>({
      mutationFn: activateAccount,
      ...options,
    });
  };