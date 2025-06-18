import { ApiResponse, Page } from "@/types";
import { Product, ProductCreationDto, ProductStatistics, StockStatus } from "./types";
import { request } from "@/services/config/request";


export const addProduct = (product: ProductCreationDto): Promise<ApiResponse<Product>> => {
    return request<Product>({
      url: "/product",
      method: "post",
      data: product,
    });
}

export const getProductById = (id:number) : Promise<ApiResponse<Product>> =>  {
  return request<Product>({
    url: `/product/${(id)}`,
    method: "get",
  });
}

export const getProducts = (
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


export const getProductStatistics = () : Promise<ApiResponse<ProductStatistics>> =>  {
  return request<ProductStatistics>({
    url: `/product/statistics`,
    method: "get",
  });
}
  
