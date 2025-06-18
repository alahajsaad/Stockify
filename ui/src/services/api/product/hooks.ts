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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    });
}




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
    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 15, // Consider data fresh for 15 minutes
    //refetchOnMount: false, // Don't refetch when component mounts
    enabled: true // Don't fetch automatically, require explicit refetch
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

// export const useGetProductById = (id: number) => {

//   const queryClient = useQueryClient();
  
//   // We'll move the useQuery hook before any conditionals
//   const result = useQuery<Product, Error>({
//     queryKey: ['Products', 'byId', id],
//     queryFn: () => {
//       // First, check if we have this product in any existing filtered product queries
//       const queriesData = queryClient.getQueriesData<Page<Product>>({
//         queryKey: ['Products', 'filteredProducts'],
//       });
      
//       // Look through all filtered product queries
//       for (const [, pageData] of queriesData) {
//         if (pageData?.content) {
//           const foundProduct = pageData.content.find(product => product.id === id);
//           if (foundProduct) {
//             // Store in dedicated cache entry for future direct access
//             queryClient.setQueryData(['Products', 'byId', id], foundProduct);
//             return Promise.resolve(foundProduct);
//           }
//         }
//       }
      
//       // If not found in cache, make the API request
//       return getProductById(id).then(response => {
//         if (response.status === 'error') {
//           throw new Error(response.message);
//         }
//         if (!response.data) {
//           throw new Error('No data returned from server');
//         }
//         return response.data;
//       });
//     },
//     gcTime: Infinity, // Keep data in cache until app is closed
//     staleTime: 1000 * 60 * 15, // Consider data fresh for 15 minutes
//     enabled: id > 0 && !isNaN(id) // Only enable the query for valid IDs
//   });

//   // For invalid IDs, return a custom error object
//   if (id <= 0 || isNaN(id)) {
//     return {
//       isLoading: false,
//       isPending: false,
//       isError: true,
//       data: undefined,
//       error: new Error("Invalid product ID"),
//       refetch: () => Promise.reject(new Error("Invalid product ID"))
//     } as const;
//   }

//   return result;
// };


 export const useGetProductStatistics = () => {
    return useQuery<ApiResponse<ProductStatistics>, Error>({
      queryKey: ['productStatistics'], 
      queryFn: () => getProductStatistics().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<ProductStatistics>;
      }),


    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 60, // Consider data fresh for 60 minutes
    
    });

     
  };