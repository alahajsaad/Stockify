import request from "@/services/config/request";
import { ApiResponse } from "@/types";
import { SubscriptionPlanStatistics } from "./types";

export const getSubscriptionStatistics = (): Promise<ApiResponse<SubscriptionPlanStatistics>> => {
  return request<SubscriptionPlanStatistics>({
    url: "/subscription/statistics",
    method: "get",
  });
};