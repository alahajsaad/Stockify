import request from "@/services/config/request";
import { ApiResponse } from "@/types";
import { UserResponseDto } from "./types";


export const getUsersByCompany = (id: number): Promise<ApiResponse<UserResponseDto[]>> => {
  return request<UserResponseDto[]>({
        url: `/user/company/${id}`,
        method: "get",  
    });
};
