import { CompanyCreationDto, CompanyResponseDto } from "src/types/company";
import request from "./request";
import { ApiResponse } from "src/types";
import { toastHandler } from "./toastHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createCompany = (company: CompanyCreationDto, adminId: number): Promise<ApiResponse<CompanyResponseDto>> => {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("taxNumber", company.taxNumber);
    formData.append("email", company.email);
    formData.append("phone", company.phone);
    formData.append("address", company.address);
    formData.append("city", company.city);
    formData.append("zipCode", company.zipCode);
    
    // Handle file upload safely
    if (company.logo instanceof File) {
        formData.append("logo", company.logo);
    }
    
    formData.append("adminId", adminId.toString());
  
    const response = request<CompanyResponseDto>({
      url: `/company`, // URL correcte
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  
    toastHandler(response);
    return response;
};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<CompanyResponseDto>, Error, { company: CompanyCreationDto, adminId: number }>({
        mutationFn: ({ company, adminId }) => 
            createCompany(company, adminId).then(response => {
                if (response.status === 'error') {
                    throw new Error(response.message);
                }
                return response;
            }),
        onSuccess: (response) => {
            // Invalidate and refetch company-related queries
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['company', response.data?.id] });
        },
        onError: (error) => {
            console.error("Company creation failed:", error);
        }
    });
};
  