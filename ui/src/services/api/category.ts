import { ApiResponse, Category } from "src/types";
import request from "../config/request";
import { toastHandler } from "./toastHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const addNewCategory = (category: Category): Promise<ApiResponse<Category>> => {
    const response = request<Category>({
      url: "/category",
      method: "post",
      data: category,
    });
    toastHandler(response);
    return response; 
  };

export const searchCategory = (searchKey : string): Promise<ApiResponse<Category[]>> => {
    const  response = request<Category[]>({
      url: `/category/search?searchKey=${(searchKey)}`,
      method: "get",
  });
   return response;
};

export const getCategoryById = (id : number): Promise<ApiResponse<Category>> => {
    const response = request<Category>({
      url: `/category?id=${(id)}`,
      method: "get",
  });
  return response 
};

export const updateCategory = (category : Category): Promise<ApiResponse<Category>> => {
    const response = request<Category>({
      url:  "/category",
      method: "put",
      data: category ,
  });
  toastHandler(response)
  return response 
};

export const deleteCategory = (id : number): Promise<ApiResponse<void>> => {
    const response = request<void>({
      url:  `/category?id=${(id)}`,
      method: "delete",
  });
  toastHandler(response)
  return response 
};

export const useSearchedCategories = (searchKey: string, isEnabled = true) => {
  return useQuery<Category[], Error>({
    queryKey: ['Categories', searchKey],
    queryFn: () => {
      if (!searchKey || searchKey.trim() === "") {
        return Promise.resolve([]);
      }
      return searchCategory(searchKey).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Category[];
      });
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    enabled: typeof searchKey === "string" && searchKey.trim().length > 0 && isEnabled,
    refetchOnMount: false
  });
};


export const useAddCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Category, Error, Category>({
    mutationFn: (category: Category) =>
      addNewCategory(category).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Category;
      }),
    onSuccess: (newCategory) => {
      // Update the cache with the new category
      queryClient.setQueryData(['Categories'], (oldData: Category[] | undefined) => {
        // If we don't have any existing data, create a new array with just the new category
        if (!oldData) {
          return [newCategory];
        }
        // Otherwise add the new category to the existing array
        return [...oldData, newCategory];
      });
    }
  });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
     
    return useMutation<Category, Error, Category>({
      mutationFn: (category: Category) => 
        updateCategory(category).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response.data as Category;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Categories'] });
      }
    });
  };

  
  export const useGetCategoryById = (id: number) => {
    return useQuery<Category, Error>({
      queryKey: ['Category', id], 
      queryFn: () => getCategoryById(id).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Category;
      }),
      enabled: false // Only run query when id is available
    });
  };
 
  export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<void>, Error, number>({
      mutationFn: (id: number) => deleteCategory(id),
      onSuccess: () => {
        // Invalidate and refetch the list query when a record is deleted
        queryClient.invalidateQueries({ queryKey: ['Categories'] });
      }
    });
  };
