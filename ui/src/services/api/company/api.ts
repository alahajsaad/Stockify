import request from "@/services/config/request";
import { ApiResponse, Page } from "@/types";
import { ConsultCompanyDto, GetCompaniesParams } from "./types";



export const getCompanies = (params: GetCompaniesParams ): Promise<ApiResponse<Page<ConsultCompanyDto>>> => {
  return request<Page<ConsultCompanyDto>>({
    url: "/company",
    method: "get",
    params,
  });
};



