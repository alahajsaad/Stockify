import { ApiResponse } from "src/types";
import request from "./request";
import { toastHandler } from "./toastHandler";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



export const activateAccount = (token: string): Promise<ApiResponse<void>> => {
  const response = request<void>({
    //@RequestParam
    url: `/accountActivation?token=${encodeURIComponent(token)}`,
    method: "post",
   
  });
  toastHandler(response);
  return response 

};

export const getNewActivationCode = (id: number): Promise<ApiResponse<void>> => {
  const response = request<void>({
    url: `/accountActivation/new?id=${(id)}`,
    method: "get",
});
  return response 

};



export const useGetNewActivationCode = (id: number) => {
  return useQuery<void ,Error>({
    queryKey: ['Activation-code', id], 
    queryFn: () => getNewActivationCode(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      toast.success(response.message);
    }),
    enabled: false 
  });
};


