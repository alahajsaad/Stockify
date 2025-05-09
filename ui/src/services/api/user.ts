import { ApiResponse, User, UserResponseDto } from "src/types";
import request from "./request";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



export const createAdminAccount = (user: User): Promise<ApiResponse<UserResponseDto>> => {
  const response = request<UserResponseDto>({
    url: "/user/admin",
    method: "post",
    data: user,
  });
  return response 
};

export const getUserById = (id: number): Promise<ApiResponse<UserResponseDto>> => {
  const response = request<UserResponseDto>({
    url:`/user?id=${(id)}`,
    method: "get",
  });
  return response 
};


export const useCreateAdminAccount = () => {
  return useMutation<ApiResponse<UserResponseDto>, Error, User>({
    mutationFn: (user: User) =>
      createAdminAccount(user).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        toast.success(response.message);
        return response as ApiResponse<UserResponseDto>; 
      }),
      
  });
};

export const useGetUserById = (id: number) => {
  return useQuery<UserResponseDto, Error>({
    queryKey: ['users', id], 
    queryFn: () => getUserById(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as UserResponseDto;
    }),
    enabled: false // Only run query when id is available
  });
};




