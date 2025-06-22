import { ApiResponse, Page } from "@/types";
import { DynamicPartner, PartnerType } from "./types";
import { request } from "@/services/config/request";

export const getPartners = (params: {
    keyword?: string
    partnerType:PartnerType
    page?: number
    size?:number
  }): Promise<ApiResponse<Page<DynamicPartner>>> => {
    return request<Page<DynamicPartner>>({
      url: "/partner",
      method: "get",
      params
  });
};

export const getPartnerById = (id: number): Promise<ApiResponse<DynamicPartner>> => {
  return request<DynamicPartner>({
    url: `/partner/${id}`,
    method: "get",
  });
};
