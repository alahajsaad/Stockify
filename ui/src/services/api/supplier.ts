import { ApiResponse, Page } from "src/types";
import { Supplier } from "src/types/supplier";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../config/request";


export const addSupplier = (supplier : Supplier): Promise<ApiResponse<Supplier>> => {
  return request<Supplier>({
    url: "/supplier",
    method: "post",
    data : supplier
  });
};

export const updateSupplier = (supplier : Supplier): Promise<ApiResponse<Supplier>> => {
  return request<Supplier>({
    url: "/supplier",
    method: "put",
    data : supplier
  });
};

export const getSuppliers = (params: {
  keyWord?: string; 
  page?: number;
  size?: number;
}): Promise<ApiResponse<Page<Supplier>>> => {
  return request<Page<Supplier>>({
    url: "/supplier",
    method: "get",
    params,
  });
};

// Create a stable cache key generator
const generateSupplierCacheKey = (params: {
  keyWord?: string;
  page?: number;
  size?: number;
}): QueryKey => {
  const { keyWord = '', page = 0, size = 10 } = params;
  return ['Suppliers', keyWord, page, size];
};



export const useAddSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<Supplier>, Error, Supplier>({
    mutationFn: (supplier: Supplier) =>
      addSupplier(supplier).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
    onSuccess: (newSupplier) => {
      // Update the cache with the new category
      queryClient.setQueryData(['Suppliers'], (oldData: Supplier[] | undefined) => {
        // If we don't have any existing data, create a new array with just the new category
        if (!oldData) {
          return [newSupplier];
        }
        // Otherwise add the new category to the existing array
        return [...oldData, newSupplier];
      });
    }
  });
};

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<Supplier>, Error, Supplier>({
      mutationFn: (supplier: Supplier) => 
        updateSupplier(supplier).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Suppliers'] });
      }
    });
  };

export const useGetSuppliers = (params: {
  keyWord?: string;
  page?: number;
  size?: number;
}) => {
  const queryKey = generateSupplierCacheKey(params);
  
  return useQuery<ApiResponse<Page<Supplier>>, Error>({
    queryKey,
    queryFn: () => getSuppliers(params).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    }),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
    enabled: true // Changed from false to true
  });
};
