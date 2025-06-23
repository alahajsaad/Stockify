import { ApiResponse } from "@/types";
import { SubscriptionPlan } from "./types";
import { request } from "@/services/config/request";


export const createSubscriptionPlan = (plan: SubscriptionPlan): Promise<ApiResponse<SubscriptionPlan>> => {
  return request<SubscriptionPlan>({
    url: "/subscriptionPlan",
    method: "post",
    data: plan,
  });
};

export const updateSubscriptionPlan = (plan: SubscriptionPlan): Promise<ApiResponse<SubscriptionPlan>> => {
  return request<SubscriptionPlan>({
    url: "/subscriptionPlan",
    method: "put",
    data: plan,
  });
};

export const getSubscriptionPlans = (): Promise<ApiResponse<SubscriptionPlan[]>> => {
  return request<SubscriptionPlan[]>({
    url: "/subscriptionPlan/all",
    method: "get",
   
  });
};

export const deleteSubscriptionPlan = (id : number): Promise<ApiResponse<void>> => {
    return request<void>({
      url: `/subscriptionPlan/${id}`,
      method: "delete",
  });
  
};