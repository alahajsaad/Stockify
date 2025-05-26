import { Client } from "src/features/client";
import { ApiResponse, Page } from "src/types";
import request from "../config/request";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "./product";

export type PaymentStatus = | "ALL" | "PAID" | "UNPAID"
export type DeliveryStatus = | "ALL" | "DELIVERED" | "UNDELIVERED"
export type ClientOrderLine = {
    id:number
    product:Product
    quantity:number
    unitPrice:number
    valueAddedTax:number
}
export type ClientOrder = {
    id : number 
    orderNumber : string
    totalExcludingTax : number
    totalIncludingTax : number
    paymentStatus : PaymentStatus
    deliveryStatus : DeliveryStatus
    orderLines:ClientOrderLine[]
    client:Client
}

// API functions
export const addClientOrder = (order: ClientOrder): Promise<ApiResponse<ClientOrder>> => {
  return request<ClientOrder>({
    url: "/client/order",
    method: "post",
    data: order,
  });
};