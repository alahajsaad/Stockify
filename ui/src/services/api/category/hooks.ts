import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, CreateCategoryDto } from "./types";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "./api";
import { ApiResponse, Page } from "@/types";


export const useAddCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Category, Error, CreateCategoryDto>({
    mutationFn: (category: CreateCategoryDto) =>
      addCategory(category).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Category;
      }),
     onSuccess: (newCategory) => {
      // Invalidate all Categories queries instead of trying to update cache manually
      queryClient.invalidateQueries({ 
        queryKey: ['Categories'],
        exact: false // This will invalidate all queries that start with ['Categories']
      });
      
      // Alternative: If you want to keep optimistic updates, update all matching queries
      // queryClient.setQueryData(['Categories'], (oldData: Category[] | undefined) => {
      //   if (!oldData) return [newCategory];
      //   return [...oldData, newCategory];
      // });
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
        queryClient.invalidateQueries({ queryKey: ['Categories'] ,exact: false  });
        
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


export const useGetCategories = (params: {
    keyword?: string;
    page?: number;
    size?:number
  }) => {
  return useQuery<Page<Category>, Error>({
    queryKey: ['Categories', params],
    queryFn: () => {
        return getCategories(params).then(response => {
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
    refetchOnMount: false
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
