import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateVat, ValueAddedTax } from "./types";
import { addValueAddedTax, deleteValueAddedTax, getAllTaxValue, getValueAddedTaxById, updateValueAddedTax } from "./api";
import { ApiResponse } from "@/types";

export const useAddValueAddedTax = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<ValueAddedTax>, Error, CreateVat>({
      mutationFn: (tax: CreateVat) => 
        addValueAddedTax(tax).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response as ApiResponse<ValueAddedTax>;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Value_added_taxes'] });
      }
    });
  };

export const useUpdateValueAddedTax = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<ValueAddedTax>, Error, ValueAddedTax>({
      mutationFn: (tax: ValueAddedTax) => 
        updateValueAddedTax(tax).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response as ApiResponse<ValueAddedTax>;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Value_added_taxes'] });
      }
    });
  };

  
  export const useGetValueAddedTaxById = (id: number) => {
    return useQuery<ValueAddedTax, Error>({
      queryKey: ['ValueAddedTax', id], 
      queryFn: () => getValueAddedTaxById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ValueAddedTax;
      }),
      enabled: false // Only run query when id is available
    });
  };


  export const useGetVats = () => {
    return useQuery<ValueAddedTax[], Error>({
      queryKey: ['Value_added_taxes'],
      queryFn: () => {
          return getAllTaxValue().then(response => {
              if (response.status === 'error') {
              throw new Error(response.message);
              }
              if (!response.data) {
              throw new Error('No data returned from server');
              }
              return response.data;
          });
      },
      gcTime: Infinity,
      staleTime: 1000 * 60 * 15,
    });
  };
  
  
 
  export const useDeleteValueAddedTax = () => {
    const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<void>, Error, number>({
      mutationFn: (id: number) => deleteValueAddedTax(id),
      onSuccess: () => {
        // Invalidate and refetch the list query when a record is deleted
        queryClient.invalidateQueries({ queryKey: ['Value_added_taxes'] });
      }
    });
  };