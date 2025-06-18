import { ApiResponse, Page } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetSupplierOrdersParams, SupplierOrder, SupplierOrderCreationDto, SupplierOrderFullDto, SupplierOrderResponseDto, SupplierOrderStatistics } from "./types";
import { addSupplierOrder, getNewOrderNumber, getSupplierOrderById, getSupplierOrders, getSupplierOrderStatistics, updateSupplierOrder } from "./api";

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

export const useUpdateSupplierOrder = () => {
    //const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<SupplierOrderFullDto>, Error, SupplierOrderFullDto>({
      mutationFn: (order: SupplierOrderFullDto) => 
        updateSupplierOrder(order).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response;
        }),
     
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
   // refetchOnMount: false
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
    queryKey: ['SupplierOrderNumber'],
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

 export const useGetSupplierOrderStatistics = () => {
    return useQuery<ApiResponse<SupplierOrderStatistics>, Error>({
      queryKey: ['supplierOrderStatistics'], 
      queryFn: () => getSupplierOrderStatistics().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<SupplierOrderStatistics>;
      }),


    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 60, // Consider data fresh for 60 minutes
    
    });

     
  };