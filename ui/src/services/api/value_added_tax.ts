import { ApiResponse, valueAddedTax, valueAddedTaxFullDto } from "src/types";
import { toastHandler } from "./toastHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../config/request";



export const addNewValueAddedTax = (tax: valueAddedTax): Promise<ApiResponse<valueAddedTax>> => {
    const response = request<valueAddedTax>({
      url: "/vat",
      method: "post",
      data: tax,
    });
    toastHandler(response);
    return response; 
  };

export const  getAllTaxValue = (): Promise<valueAddedTaxFullDto[]> => {
    const  response = request<valueAddedTaxFullDto[]>({
      url: "/vat",
      method: "get",
  });
   return response.then((response) => response.data ?? []) 
};

export const getValueAddedTaxById = (id : number): Promise<ApiResponse<valueAddedTax>> => {
    const response = request<valueAddedTax>({
      url: `/vat?id=${(id)}`,
      method: "get",
  });
  toastHandler(response)
  return response 
};

export const updateValueAddedTax = (vat : valueAddedTax): Promise<ApiResponse<valueAddedTax>> => {
    const response = request<valueAddedTax>({
      url:  "/vat",
      method: "put",
      data: vat ,
  });
  toastHandler(response)
  return response 
};

export const deleteValueAddedTax = (id: number): Promise<ApiResponse<void>> => {
  return request<void>({
    url: `/vat/${id}`, // ✅ match @PathVariable
    method: "delete",
  });
};



export const useGetValueAddedTaxList = (isEnabled = true) =>{
    return useQuery<valueAddedTaxFullDto[],Error>(
       { 
        queryKey : ['ListOfValueAddedTax'] , 
        queryFn : getAllTaxValue ,
        gcTime: Infinity, 
        staleTime : 1000 * 60 * 15 ,
        enabled : isEnabled
    }
)}

export const useAddValueAddedTax = () => {
    const queryClient = useQueryClient();
     
    return useMutation<valueAddedTax, Error, valueAddedTax>({
      mutationFn: (tax: valueAddedTax) => 
        addNewValueAddedTax(tax).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response.data as valueAddedTax;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ListOfValueAddedTax'] });
      }
    });
  };

export const useUpdateValueAddedTax = () => {
    const queryClient = useQueryClient();
     
    return useMutation<valueAddedTax, Error, valueAddedTax>({
      mutationFn: (tax: valueAddedTax) => 
        updateValueAddedTax(tax).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response.data as valueAddedTax;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ListOfValueAddedTax'] });
      }
    });
  };

  
  export const useGetValueAddedTaxById = (id: number) => {
    return useQuery<valueAddedTax, Error>({
      queryKey: ['ValueAddedTax', id], 
      queryFn: () => getValueAddedTaxById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as valueAddedTax;
      }),
      enabled: false // Only run query when id is available
    });
  };
 
  export const useDeleteValueAddedTax = () => {
    const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<void>, Error, number>({
      mutationFn: (id: number) => deleteValueAddedTax(id),
      onSuccess: () => {
        // Invalidate and refetch the list query when a record is deleted
        queryClient.invalidateQueries({ queryKey: ['ListOfValueAddedTax'] });
      }
    });
  };