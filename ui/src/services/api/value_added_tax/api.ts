import request from "@/services/config/request";
import { ApiResponse } from "@/types";
import { CreateVat, ValueAddedTax } from "./types";

export const addValueAddedTax = (tax: CreateVat): Promise<ApiResponse<ValueAddedTax>> => {
    return request<ValueAddedTax>({
      url: "/vat",
      method: "post",
      data: tax,
    });
};

export const  getAllTaxValue = (): Promise<ApiResponse<ValueAddedTax[]>> => {
    return request<ValueAddedTax[]>({
      url: "/vat",
      method: "get",
    });
  
};

export const getValueAddedTaxById = (id : number): Promise<ApiResponse<ValueAddedTax>> => {
    return request<ValueAddedTax>({
      url: `/vat?id=${(id)}`,
      method: "get",
  });

};

export const updateValueAddedTax = (vat : ValueAddedTax): Promise<ApiResponse<ValueAddedTax>> => {
    return request<ValueAddedTax>({
      url:  "/vat",
      method: "put",
      data: vat ,
  });
};

export const deleteValueAddedTax = (id: number): Promise<ApiResponse<void>> => {
  return request<void>({
    url: `/vat/${id}`,
    method: "delete",
  });
};