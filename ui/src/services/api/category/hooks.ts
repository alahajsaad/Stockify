import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryCreationDto } from "./types";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "./api";
import { ApiResponse, Page } from "@/types";
import { toast } from "react-toastify";


export const useAddCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<Category>, Error, CategoryCreationDto>({
    mutationFn: (category: CategoryCreationDto) =>
      addCategory(category).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Category>;
      }),
     onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['Categories'] });
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
    refetchOnMount: true
  });
};



  export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, number>({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: (_data, deletedId) => {
      // Get all cached queries starting with ['Categories']
      const queries = queryClient.getQueriesData<Page<Category>>({ queryKey: ['Categories'] });

      queries.forEach(([key, oldData]) => {
        if (!oldData) return;

        // Remove the deleted category from the cached data
        const updatedData = {
          ...oldData,
          content: oldData.content.filter((category) => category.id !== deletedId),
        };

        // Update the cache for this query key
        queryClient.setQueryData(key, updatedData);
      });
    }
  });
};

