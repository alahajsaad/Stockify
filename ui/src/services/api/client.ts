import { Client } from "src/features/client";
import { ApiResponse, Page } from "src/types";
import request from "./request";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API functions
export const addClient = (client: Client): Promise<ApiResponse<Client>> => {
  return request<Client>({
    url: "/client",
    method: "post",
    data: client,
  });
};

export const updateClient = (client: Client): Promise<ApiResponse<Client>> => {
  return request<Client>({
    url: "/client",
    method: "put",
    data: client,
  });
};

export const getClients = (params: {
  keyWord?: string; 
  page?: number;
  size?: number;
}): Promise<ApiResponse<Page<Client>>> => {
  return request<Page<Client>>({
    url: "/client",
    method: "get",
    params,
  });
};

// Create a stable cache key generator
const generateClientCacheKey = (params: {
  keyWord?: string;
  page?: number;
  size?: number;
}): QueryKey => {
  const { keyWord = '', page = 0, size = 10 } = params;
  return ['Clients', keyWord, page, size];
};

// React Query hooks
export const useAddClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<Client>, Error, Client>({
    mutationFn: (client: Client) =>
      addClient(client).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
    onSuccess: () => {
      // Invalidate queries to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['Clients'] });
    }
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
   
  return useMutation<ApiResponse<Client>, Error, Client>({
    mutationFn: (client: Client) => 
      updateClient(client).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Clients'] });
    }
  });
};

export const useGetClients = (params: {
  keyWord?: string;
  page?: number;
  size?: number;
}) => {
  const queryKey = generateClientCacheKey(params);
  
  return useQuery<ApiResponse<Page<Client>>, Error>({
    queryKey,
    queryFn: () => getClients(params).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    }),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
    enabled:false
  });
};