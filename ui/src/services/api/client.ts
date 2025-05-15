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

export const getClientById = (id:number) : Promise<ApiResponse<Client>> =>  {
  return request<Client>({
    url: `/client/${id}`,
    method: "get",
  });
}

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

export const useGetClientById = (id: number) => {
  const queryClient = useQueryClient();
  
  // We'll move the useQuery hook before any conditionals
  const result = useQuery<Client, Error>({
    queryKey: ['Clients', 'byId', id],
    queryFn: () => {
      // First, check if we have this client in any existing filtered product queries
      const queriesData = queryClient.getQueriesData<Page<Client>>({
        queryKey: ['Clients'],
      });
      
      // Look through all filtered product queries
      for (const [, pageData] of queriesData) {
        if (pageData?.content) {
          const foundClient = pageData.content.find(client => client.id === id);
          if (foundClient) {
            // Store in dedicated cache entry for future direct access
            queryClient.setQueryData(['Clients', 'byId', id], foundClient);
            return Promise.resolve(foundClient);
          }
        }
      }
      
      // If not found in cache, make the API request
      return getClientById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        if (!response.data) {
          throw new Error('No data returned from server');
        }
        return response.data;
      });
    },
    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 15, // Consider data fresh for 15 minutes
    refetchOnMount: false, // Don't refetch when component mounts
    enabled: id > 0 && !isNaN(id) // Only enable the query for valid IDs
  });

  // For invalid IDs, return a custom error object
  if (id <= 0 || isNaN(id)) {
    return {
      isLoading: false,
      isPending: false,
      isError: true,
      data: undefined,
      error: new Error("Invalid Client ID"),
      refetch: () => Promise.reject(new Error("Invalid Client ID"))
    } as const;
  }

  return result;
};