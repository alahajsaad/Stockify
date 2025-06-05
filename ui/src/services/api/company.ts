import { Company, CompanyCreationDto } from "src/types/company";
import { request } from "../config/request";
import { ApiResponse } from "src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fileRequest } from "../config/fileRequest";


const getFormData = (company: CompanyCreationDto): FormData => {
  const formData = new FormData();

  formData.append("name", company.name);
  formData.append("taxNumber", company.taxNumber);
  formData.append("email", company.email);
  formData.append("phone", company.phone);
  formData.append("address", company.address);
  formData.append("city", company.city);
  formData.append("zipCode", company.zipCode);

  if (company.logo && company.logo instanceof File) {
    formData.append("logo", company.logo);
  }

  return formData;
};

export const createCompany = (
  company: CompanyCreationDto,
  adminId: number
): Promise<ApiResponse<Company>> => {
  const formData = getFormData(company);
  formData.append("adminId", adminId.toString());

  return request<Company>({
    url: `/company`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const updateCompany = (company: CompanyCreationDto): Promise<ApiResponse<Company>> => {
  const formData = getFormData(company);

  if (company.id) {
    formData.append("id", company.id.toString());
  } else {
    throw new Error("L'identifiant de l'entreprise est requis pour la mise à jour.");
  }

  return request<Company>({
    url: `/company`,
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const getCompanyByAdminId = (adminId : number): Promise<ApiResponse<Company>> => {
    return request<Company>({
        url: `/company/${adminId}`,//  match @PathVariable
        method: "get",  
    });
};

export const getCompanyLogo = (id: number): Promise<Blob> => {
  return fileRequest({
    url: `/company/${id}/logo`,
    method: "get",
  });
};




// Hooks

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Company>, Error, { company: CompanyCreationDto; adminId: number }>({
    mutationFn: async ({ company, adminId }) => {
      const response = await createCompany(company, adminId);
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      if (response.data?.id) {
        queryClient.invalidateQueries({ queryKey: ["company", response.data.id] });
      }
    },
    onError: (error) => {
      console.error("Échec de la création de l'entreprise :", error.message);
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Company>, Error, { company: CompanyCreationDto }>({
    mutationFn: async ({ company }) => {
      const response = await updateCompany(company);
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      if (response.data?.id) {
        queryClient.invalidateQueries({ queryKey: ["company", response.data.id] });
      }
    },
    onError: (error) => {
      console.error("Échec de la mise à jour de l'entreprise :", error.message);
    },
  });
};

export const useGetCompanyLogo = (id: number) => {
  return useQuery({
    queryKey: ["companyLogo", id],
    queryFn: () => getCompanyLogo(id),
    enabled: false ,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetCompanyById = (id: number) => {
  return useQuery<Company, Error>({
    queryKey: ['company', id], 
    queryFn: () => getCompanyByAdminId(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as Company;
    }),
    enabled: !!id && id > 0 // Activé seulement si l'ID est valide
  });
};