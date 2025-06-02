import { useQuery } from "@tanstack/react-query";
import { SubscriptionPlanStatistics } from "./types";
import { getSubscriptionStatistics } from "./api";


export const useGetSubscriptionPlanStatistics = () => {
  return useQuery<SubscriptionPlanStatistics, Error>({
    queryKey: ['subscriptionPlanStatistics'], 
    queryFn: () => getSubscriptionStatistics().then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as SubscriptionPlanStatistics;
    }),
    enabled: false
  });
};