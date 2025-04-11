import { ApiResponse, User, UserResponseDto } from "src/types";
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
