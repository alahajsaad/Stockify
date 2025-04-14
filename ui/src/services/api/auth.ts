// src/api/auth.ts
import request from "./request";

import { ApiResponse, LoginRequest, LoginResponse } from "src/types";



  export const authenticate = (user: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return request<LoginResponse>({
      url: "/auth/login",
      method: "post",
      data: user,
    });
  };
  
