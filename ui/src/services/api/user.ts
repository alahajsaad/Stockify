import { ApiResponse, User, UserResponseDto } from "src/types";
import request from "./request";



export const createAdminAccount = (user: User): Promise<ApiResponse<UserResponseDto>> => {
  return request<ApiResponse<UserResponseDto>>({
    url: "/user/admin",
    method: "post",
    data: user,
  });
};
