import { ApiResponse, Page } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetSupplierOrdersParams, SupplierOrder, SupplierOrderCreationDto, SupplierOrderFullDto, SupplierOrderResponseDto } from "./types";
import { addSupplierOrder, getNewOrderNumber, getSupplierOrderById, getSupplierOrders } from "./api";

export const useAddSupplierOrder = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<SupplierOrder>, Error, SupplierOrderCreationDto>({
      mutationFn: (order: SupplierOrderCreationDto) => 
        addSupplierOrder(order).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplierOrders'] });
      }
    });
}


export const useGetSupplierOrders = (params: GetSupplierOrdersParams) => {
  return useQuery<Page<SupplierOrderResponseDto>, Error>({
    queryKey: ['supplierOrders', params],
    queryFn: () => {
        return getSupplierOrders(params).then(response => {
            return response;
        });
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false
  });
};


 export const useGetSupplierOderById = (id: number) => {
    return useQuery<SupplierOrderFullDto, Error>({
      queryKey: ['supplierOrder', id], 
      queryFn: () => getSupplierOrderById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as SupplierOrderFullDto;
      }),
    });
  };



export const useGetNewOrderNumber = () => {
  return useQuery<string, Error>({
    queryKey: ['newOrderNumber'],
    queryFn: () => {
      return getNewOrderNumber().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        if (!response.data) {
          throw new Error('No data returned from server');
        }
        return response.data;
      });
    },
    enabled: true,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache the result (gcTime replaces cacheTime in newer versions)
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: false // Prevent refetch on window focus
  });
};

