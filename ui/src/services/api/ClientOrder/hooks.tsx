import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addClientOrder, getClientOrderById, getClientOrders, getClientOrderStatistics, getNewOrderNumber, updateClientOrder } from "./api";
import { ApiResponse, Page } from "@/types";
import { ClientOrder, ClientOrderFullDto, ClientOrderResponseDto, ClientOrderStatistics, GetClientOrdersParams } from "./types";



export const useAddClientOrder = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<ClientOrder>, Error, ClientOrder>({
      mutationFn: (order: ClientOrder) => 
        addClientOrder(order).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clientOrders'] });
      }
    });
}


export const useUpdateClientOrder = () => {
    //const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<ClientOrderFullDto>, Error, ClientOrderFullDto>({
      mutationFn: (order: ClientOrderFullDto) => 
        updateClientOrder(order).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response;
        }),
     
    });
}

export const useGetClientOrders = (params: GetClientOrdersParams) => {
  return useQuery<Page<ClientOrderResponseDto>, Error>({
    queryKey: ['clientOrders', params],
    queryFn: () => {
        return getClientOrders(params).then(response => {
            return response;
        });
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false
  });
};


 export const useGetClientOrderById = (id: number) => {
    return useQuery<ClientOrderFullDto, Error>({
      queryKey: ['supplierOrder', id], 
      queryFn: () => getClientOrderById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ClientOrderFullDto;
      }),
    });
  };


export const useGetClientOrderNumber = () => {
  return useQuery<string, Error>({
    queryKey: ['ClientOrderNumber'],
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

 export const useGetClientOrderStatistics = () => {
    return useQuery<ApiResponse<ClientOrderStatistics>, Error>({
      queryKey: ['clientOrderStatistics'], 
      queryFn: () => getClientOrderStatistics().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<ClientOrderStatistics>;
      }),


    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 60, // Consider data fresh for 60 minutes
    
    });

     
  };
