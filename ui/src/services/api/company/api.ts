// company api.tsx
import request from "@/services/config/request";
import { ApiResponse, Page } from "@/types";
import { Company, CompanyMetrics, ConsultCompanyDto, GetCompaniesParams } from "./types";



export const getCompanies = (params: GetCompaniesParams ): Promise<ApiResponse<Page<ConsultCompanyDto>>> => {
  return request<Page<ConsultCompanyDto>>({
    url: "/company",
    method: "get",
    params,
  });
};

export const getCompanyById = (id : number): Promise<ApiResponse<Company>> => {
    return request<Company>({
        url: `/company/${id}`,
        method: "get",  
    });
};

export const getCompanyMetrics = () :  Promise<ApiResponse<CompanyMetrics>> => {
  return request<CompanyMetrics>({
        url: "/company/metrics",
        method: "get",  
    });
}



