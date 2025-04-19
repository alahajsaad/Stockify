import { ApiResponse, UserResponseDto } from "src/types";
import request from "./request";
import { toastHandler } from "./toastHandler";



export const activateAccount = (token: string): Promise<ApiResponse<void>> => {
  const response = request<void>({
    //@RequestParam
    url: `/accountActivation?token=${encodeURIComponent(token)}`,
    method: "post",
   
  });
  toastHandler(response);
  return response 

};

export const getNewActivationCode = (admin: UserResponseDto): Promise<ApiResponse<void>> => {
  const response = request<void>({
    //@RequestParam
    url: "/accountActivation/new",
    method: "post",
    data : admin 
   
  });
  toastHandler(response);
  return response 

};


