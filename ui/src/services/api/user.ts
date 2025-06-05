import { ApiResponse, User, UserResponseDto } from "src/types";
import { request } from "../config/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EmployeeCreationDto } from "src/types/user";

type CreateEmployeeVariables = {
  user: EmployeeCreationDto;
  companyId: number;
};

export const createAdminAccount = (user: User): Promise<ApiResponse<UserResponseDto>> => {
  return request<UserResponseDto>({
    url: "/user/admin",
    method: "post",
    data: user,
  });
};

export const createEmployeeAccount = (
  variables: CreateEmployeeVariables
): Promise<ApiResponse<UserResponseDto>> => {
  const { user, companyId } = variables;

  return request<UserResponseDto>({
    url: `/user/employee/${companyId}`,
    method: "post",
    data: user,
  });
};


export const getUserById = (id: number): Promise<ApiResponse<UserResponseDto>> => {
  const response = request<UserResponseDto>({
    url:`/user?id=${(id)}`,
    method: "get",
  });
  return response 
};

export const getUserByEmail = (email :string) : Promise<ApiResponse<UserResponseDto>> =>{
  const response = request<UserResponseDto>({
    url:`/user/email?email=${(email)}`,
    method: "get",
  });
  return response 
}

export const getUsersByCompany = (id: number): Promise<ApiResponse<UserResponseDto[]>> => {
  return request<UserResponseDto[]>({
        url: `/user/company/${id}`,
        method: "get",  
    });
};

export const useCreateAdminAccount = () => {
  return useMutation<ApiResponse<UserResponseDto>, Error, User>({
    mutationFn: (user: User) =>
      createAdminAccount(user).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        toast.success(response.message);
        console.log(response)
        return response as ApiResponse<UserResponseDto>; 
        
      }),
      
  });
};

export const useCreateEmployeeAccount = () => {
  return useMutation<ApiResponse<UserResponseDto>, Error, CreateEmployeeVariables>({
    mutationFn: createEmployeeAccount,
    onSuccess: (response) => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      toast.success(response.message);
      console.log(response);
    },
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
    enabled: false
  });
};

export const useGetUserByEmail = (email: string) => {
  return useQuery<UserResponseDto, Error>({
    queryKey: ['users', email], 
    queryFn: () => getUserByEmail(email).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as UserResponseDto;
    }),
    enabled: false 
  });
};

export const useGetUsersByCompany = (companyId: number) => {
  return useQuery<UserResponseDto[], Error>({
    queryKey: ['users', companyId], 
    queryFn: () => getUsersByCompany(companyId).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as UserResponseDto[];
    }),
    enabled: true 
  });
};




