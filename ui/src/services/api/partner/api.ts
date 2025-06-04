import { ApiResponse, Page } from "@/types";
import { PartnerResponseDto, PartnerType } from "./types";
import request from "@/services/config/request";

export const getPartners = (params: {
    keyword?: string
    partnerType:PartnerType
    page?: number
    size?:number
  }): Promise<ApiResponse<Page<PartnerResponseDto>>> => {
    return request<Page<PartnerResponseDto>>({
      url: "/partner",
      method: "get",
      params
  });
};