import { AdminInscriptionStatus, ApiResponse, User, UserResponseDto } from "src/types";
import request from "./request";
import { toastHandler } from "./toastHandler";



export const createAdminAccount = (user: User): Promise<ApiResponse<UserResponseDto>> => {
  const response = request<UserResponseDto>({
    url: "/user/admin",
    method: "post",
    data: user,
  });
  toastHandler(response);
  return response 

};


export const getAdminInscriptionStatus = (id: number): Promise<ApiResponse<AdminInscriptionStatus>> => {
  const response = request<AdminInscriptionStatus>({
    url:`/user/admin/inscription?id=${(id)}`,
    method: "get",
   
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
