import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductCreationDto, ProductStatistics, StockStatus } from "./types";
import { addProduct, getProductById, getProducts, getProductStatistics } from "./api";
import { ApiResponse, Page } from "@/types";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
        
  return useMutation<ApiResponse<Product>, Error, ProductCreationDto>({
    mutationFn: (product: ProductCreationDto) =>
      addProduct(product).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response;
      }),
    onSuccess: (data) => {
      // Invalider toutes les requêtes qui commencent par ['Products']
      // queryClient.invalidateQueries({ 
      //   queryKey: ['Products'],
      //   exact: false // Important: invalide toutes les clés qui commencent par ['Products']
      // });
      
      // Alternative: mise à jour optimiste du cache
      // Optionnel: mettre à jour directement les caches existants
      queryClient.getQueriesData<Page<Product>>({ queryKey: ['Products'] })
        .forEach(([queryKey, cachedData]) => {
          if (cachedData && data.data) {
            // Ajouter le nouveau produit aux données existantes
            const updatedData: Page<Product> = {
              ...cachedData,
              content: [data.data, ...cachedData.content],
              totalElements: cachedData.totalElements + 1
            };
            queryClient.setQueryData(queryKey, updatedData);
          }
        });
    }
  });
};




const generateProductCacheKey = (params: {
  status: StockStatus | "ALL";
  keyword?: string;
  page?: number;
  size?: number;
}): QueryKey => {
  // Create a stable cache key that doesn't depend on object reference
  const { status, keyword, page = 0, size = 10 } = params;
  return ['Products', 'filteredProducts', status , keyword || '', page, size];
};


export const useGetProducts = (
  params: {
    status?: StockStatus | "ALL";
    keyword?: string;
    page?: number;
    size?: number;
  }
) => {
  const queryClient = useQueryClient();
  const queryKey = generateProductCacheKey(params);
  
  return useQuery<Page<Product>, Error>({
    queryKey,
    queryFn: () => {
      // Check if we already have cached data for this exact request
      const cachedData = queryClient.getQueryData<Page<Product>>(queryKey);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
      
      // If not in cache, fetch from API
      return getProducts(params).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        if (!response.data) {
          throw new Error('No data returned from server');
        }
        return response.data;
      });
    },
    gcTime: 0, // Keep data in cache until app is closed
    staleTime:0, // Consider data fresh for 15 minutes
    refetchOnMount : true ,
  });
};


 export const useGetProductById = (id: number) => {
    return useQuery<ApiResponse<Product>, Error>({
      queryKey: ['product', id], 
      queryFn: () => getProductById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Product>;
      }),
    });
  };



 export const useGetProductStatistics = () => {
    return useQuery<ApiResponse<ProductStatistics>, Error>({
      queryKey: ['productStatistics'], 
      queryFn: () => getProductStatistics().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<ProductStatistics>;
      }),


     staleTime : 0,
     gcTime : 0
    
    });

     
  };