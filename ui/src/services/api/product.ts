import { ApiResponse, Page, valueAddedTax } from "src/types"
import request from "../config/request";
import { useMutation, useQuery, useQueryClient ,QueryKey} from "@tanstack/react-query";
import { toast } from "react-toastify";

export type StockStatus =  
| 'ALL' 
| 'IN_STOCK'
| 'OUT_OF_STOCK' 
| 'LOW_STOCK' ;

export type Product = {
    id : number,
    designation :string ,
    reference : string,
    quantity : number ,
    criticalThreshold : number,
    lastPurchasePrice : number ,
    lastSalePrice:number,
    stockStatus : StockStatus
    category : {id : number ,name : string} ,
    vat : valueAddedTax
}


export const addProduct = (product: Product): Promise<ApiResponse<Product>> => {
    return request<Product>({
      url: "/product",
      method: "post",
      data: product,
    });
}

export const getProductById = (id:number) : Promise<ApiResponse<Product>> =>  {
  return request<Product>({
    url: `/product?id=${(id)}`,
    method: "get",
  });
}

export const getFiltredProduct = (
  params: {
    status?: StockStatus ; // Adaptez selon vos enums
    keyword?: string;
    page?: number;
    size?: number;
  }
): Promise<ApiResponse<Page<Product>>> => {
  return request<Page<Product>>({
    url: "/product",
    method: "get",
    params,
  });
}
  
export const useAddProduct = () => {
    const queryClient = useQueryClient();
     
    return useMutation<Product, Error, Product>({
      mutationFn: (product: Product) => 
        addProduct(product).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          toast.success(response.message);
          return response.data as Product;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    });
}



/**
 * Generates a consistent cache key for product queries
 * 
 * @param params - Filter and pagination parameters
 * @param params.status - Optional filter for product stock status
 * @param params.keyword - Optional search keyword
 * @param params.page - Page number (defaults to 0)
 * @param params.size - Page size (defaults to 10)
 * @returns A structured query key array for React Query
 */
const generateProductCacheKey = (params: {
  status?: StockStatus;
  keyword?: string;
  page?: number;
  size?: number;
}): QueryKey => {
  // Create a stable cache key that doesn't depend on object reference
  const { status, keyword, page = 0, size = 10 } = params;
  return ['Products', 'filteredProducts', status || 'all', keyword || '', page, size];
};

/**
 * Custom hook for fetching filtered products with pagination
 * 
 * This hook efficiently manages product data by:
 * 1. Using a structured cache key for consistent caching
 * 2. Checking the cache before making API requests
 * 3. Avoiding duplicate API calls when revisiting previously loaded pages
 * 
 * @param params - Filter and pagination parameters
 * @param params.status - Optional filter for product stock status
 * @param params.keyword - Optional search keyword
 * @param params.page - Page number (defaults to 0)
 * @param params.size - Page size (defaults to 10)
 * @returns React Query result with paginated product data
 */
export const useGetFiltredProducts = (
  params: {
    status?: StockStatus;
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
      return getFiltredProduct(params).then(response => {
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
    enabled: true // Don't fetch automatically, require explicit refetch
  });
};

/**
 * Custom hook for fetching a single product by ID
 * 
 * This hook optimizes data fetching by:
 * 1. First checking if the product exists in any already-loaded product lists
 * 2. Using the cache for previously accessed products
 * 3. Only making API requests when necessary
 * 4. Safely handling invalid IDs to prevent unnecessary API calls
 * 
 * @param id - The numeric ID of the product to fetch
 * @returns React Query result with the requested product data
 */
export const useGetProductById = (id: number) => {
  const queryClient = useQueryClient();
  
  // We'll move the useQuery hook before any conditionals
  const result = useQuery<Product, Error>({
    queryKey: ['Products', 'byId', id],
    queryFn: () => {
      // First, check if we have this product in any existing filtered product queries
      const queriesData = queryClient.getQueriesData<Page<Product>>({
        queryKey: ['Products', 'filteredProducts'],
      });
      
      // Look through all filtered product queries
      for (const [, pageData] of queriesData) {
        if (pageData?.content) {
          const foundProduct = pageData.content.find(product => product.id === id);
          if (foundProduct) {
            // Store in dedicated cache entry for future direct access
            queryClient.setQueryData(['Products', 'byId', id], foundProduct);
            return Promise.resolve(foundProduct);
          }
        }
      }
      
      // If not found in cache, make the API request
      return getProductById(id).then(response => {
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
      error: new Error("Invalid product ID"),
      refetch: () => Promise.reject(new Error("Invalid product ID"))
    } as const;
  }

  return result;
};