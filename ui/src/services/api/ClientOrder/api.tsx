import { ApiResponse, Page } from "@/types";
import { rawRequest, request } from "@/services/config/request";
import { ClientOrder, ClientOrderFullDto, ClientOrderResponseDto, ClientOrderStatistics, GetClientOrdersParams } from "./types";


export const addClientOrder = (order: ClientOrder): Promise<ApiResponse<ClientOrder>> => {
  return request<ClientOrder>({
    url: "/clientOrder",
    method: "post",
    data: order,
  });
};

export const updateClientOrder = (order: ClientOrderFullDto): Promise<ApiResponse<ClientOrderFullDto>> => {
  return request<ClientOrderFullDto>({
    url: "/clientOrder",
    method: "put",
    data: order,
  });
}

export const getClientOrders = (
   params: GetClientOrdersParams
): Promise<Page<ClientOrderResponseDto>> => {
  return rawRequest<Page<ClientOrderResponseDto>>({
    url: "/clientOrder",
    method: "get",
    params,
  });
};

export const getClientOrderById = (id:number) : Promise<ApiResponse<ClientOrderFullDto>> =>{
   return rawRequest<ApiResponse<ClientOrderFullDto>>({
    url: `/clientOrder/${id}`,
    method: "get",
  });
}

export const getNewOrderNumber = (): Promise<ApiResponse<string>> => {
  return request<string>({
    url: "/clientOrder/generate-number",
    method: "get",
  });
};

export const getClientOrderStatistics = (): Promise<ApiResponse<ClientOrderStatistics>> => {
  return request<ClientOrderStatistics>({
    url: "/clientOrder/statistics",
    method: "get",
  });
};