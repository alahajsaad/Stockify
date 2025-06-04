import { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SupplierOrder, SupplierOrderCreationDto } from "./types";
import { addSupplierOrder, getNewOrderNumber } from "./api";

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
  });
};
