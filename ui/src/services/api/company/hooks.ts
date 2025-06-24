import { ApiResponse, Page } from "@/types";
import { Company, CompanyMetrics, ConsultCompanyDto, GetCompaniesParams } from "./types";
import { getCompanies, getCompanyById, getCompanyMetrics } from "./api";
import { useQuery } from "@tanstack/react-query";

export const generateCompanyCacheKey = (params: GetCompaniesParams) => [
  "companies",
  params,
];


export const useGetCompanies = (params: GetCompaniesParams) => {
  const queryKey = generateCompanyCacheKey(params);
  
  return useQuery<ApiResponse<Page<ConsultCompanyDto>>, Error>({
    queryKey,
    queryFn: () => getCompanies(params).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    }),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30, 
    enabled: true 
  });
};

export const useGetCompanyById = (id: number) => {
  return useQuery<Company, Error>({
    queryKey: ['company', id], 
    queryFn: () => getCompanyById(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as Company;
    }),
    enabled: false
  });
};

export const useGetCompanyMetrics = () => {
  return useQuery<CompanyMetrics, Error>({
    queryKey: ['companyMetrics'], 
    queryFn: () => getCompanyMetrics().then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as CompanyMetrics;
    }),
    
  });
};