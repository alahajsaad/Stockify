import { ApiResponse } from "@/types";
import { SubscriptionPlanStatistics } from "./types";
import { request } from "@/services/config/request";

export const getSubscriptionStatistics = (): Promise<ApiResponse<SubscriptionPlanStatistics>> => {
  return request<SubscriptionPlanStatistics>({
    url: "/subscription/statistics",
    method: "get",
  });
};