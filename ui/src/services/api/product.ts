import { ApiResponse, Category, valueAddedTax } from "src/types"
import request from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export type ProductStatus =  
| 'IN_STOCK'
| 'OUT_OF_STOCK' ;

export type Product = {
    id? : number,
    designation :string ,
    reference : string,
    quantity? : number ,
    criticalThreshold : number,
    productStatus? : ProductStatus
    category : Category ,
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

  
  export const useAddCategory = () => {
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

