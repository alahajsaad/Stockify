import { ApiResponse, Page } from "@/types";
import { GetSupplierOrdersParams, SupplierOrder, SupplierOrderCreationDto, SupplierOrderResponseDto } from "./types";
import { rawRequest, request } from "@/services/config/request";


export const addSupplierOrder = (order: SupplierOrderCreationDto): Promise<ApiResponse<SupplierOrder>> => {
  return request<SupplierOrder>({
    url: "/supplierOrder",
    method: "post",
    data: order,
  });
};

export const getSupplierOrders = (
   params: GetSupplierOrdersParams
): Promise<Page<SupplierOrderResponseDto>> => {
  return rawRequest<Page<SupplierOrderResponseDto>>({
    url: "/supplierOrder",
    method: "get",
    params,
  });
};

export const getNewOrderNumber = (): Promise<ApiResponse<string>> => {
  return request<string>({
    url: "/supplierOrder/generate-number",
    method: "get",
  });
};