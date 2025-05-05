import { ApiResponse, Category, Page, valueAddedTax } from "src/types"
import request from "./request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    quantity? : number ,
    criticalThreshold : number,
    lastPurchasePrice? : number ,
    stockStatus? : StockStatus
    category : {id : number ,name : string} ,
    vat : valueAddedTax
}


export const addProduct = (product: Product): Promise<ApiResponse<Product>> => {
    const response = request<Product>({
      url: "/product",
      method: "post",
      data: product,
    });
    
    return response; 
  };
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
  };
  

  
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
  };

  export const useGetFiltredProducts = (
    params: {
      status?: StockStatus;
      keyword?: string; 
      page?: number;
      size?: number;
    }
  ) => {
    return useQuery<Page<Product>, Error>({
      queryKey: ['Products', params],
      queryFn: () => {
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
      gcTime: Infinity,
      staleTime: 1000 * 60 * 15,
      refetchOnMount: false,
      enabled : false
    });
  };

  
  
 

