import { ApiResponse } from "@/types";
import { SupplierOrder, SupplierOrderCreationDto } from "./types";
import request from "@/services/config/request";


export const addSupplierOrder = (order: SupplierOrderCreationDto): Promise<ApiResponse<SupplierOrder>> => {
  return request<SupplierOrder>({
    url: "/supplierOrder",
    method: "post",
    data: order,
  });
};

export const getNewOrderNumber = (): Promise<ApiResponse<string>> => {
  return request<string>({
    url: "/supplierOrder/generate-number",
    method: "get",
  });
};