import { ApiResponse, Page } from "@/types";
import { GetSupplierOrdersParams, SupplierOrder, SupplierOrderCreationDto, SupplierOrderFullDto, SupplierOrderResponseDto } from "./types";
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

export const getSupplierOrderById = (id:number) : Promise<ApiResponse<SupplierOrderFullDto>> =>{
   return rawRequest<ApiResponse<SupplierOrderFullDto>>({
    url: `/supplierOrder/${id}`,
    method: "get",
  });
}
export const getNewOrderNumber = (): Promise<ApiResponse<string>> => {
  return request<string>({
    url: "/supplierOrder/generate-number",
    method: "get",
  });
};