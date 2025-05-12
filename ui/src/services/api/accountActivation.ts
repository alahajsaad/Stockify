import { ApiResponse } from "src/types";
import request from "./request";
import { useMutation } from "@tanstack/react-query";


export const activateAccount = (token: string): Promise<ApiResponse<void>> => {
  const response = request<void>({
    //@RequestParam
    url: `/accountActivation?token=${encodeURIComponent(token)}`,
    method: "post",
   
  });
  return response 

};



export const useActivateAccount = () => {
  return useMutation<ApiResponse<void>, Error, string>({
    mutationFn: (token) => activateAccount(token)
    
  });
};

