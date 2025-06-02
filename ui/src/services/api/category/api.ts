import request from "@/services/config/request";
import { ApiResponse, Page } from "@/types";
import { Category, CreateCategoryDto } from "./types";

export const addCategory = (category: CreateCategoryDto): Promise<ApiResponse<Category>> => {
    return request<Category>({
      url: "/category",
      method: "post",
      data: category,
    });
};

export const getCategories = (params: {
    keyword?: string;
    page?: number;
  }): Promise<ApiResponse<Page<Category>>> => {
    return request<Page<Category>>({
      url: "/category",
      method: "get",
      params
  });
};

export const getCategoryById = (id : number): Promise<ApiResponse<Category>> => {
    return request<Category>({
      url: `/category?id=${(id)}`,
      method: "get",
  });
  
};

export const updateCategory = (category : Category): Promise<ApiResponse<Category>> => {
    return request<Category>({
      url:  "/category",
      method: "put",
      data: category ,
  });
};

export const deleteCategory = (id : number): Promise<ApiResponse<void>> => {
    return request<void>({
      url:  `/category?id=${(id)}`,
      method: "delete",
  });
  
};