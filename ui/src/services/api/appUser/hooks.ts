import { useQuery } from "@tanstack/react-query";
import { getUsersByCompany } from "./api";
import { UserResponseDto } from "./types";



export const useGetUsersByCompany = (companyId: number) => {
  return useQuery<UserResponseDto[], Error>({
    queryKey: ['users', companyId], 
    queryFn: () => getUsersByCompany(companyId).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as UserResponseDto[];
    }),
    enabled: false 
  });
};