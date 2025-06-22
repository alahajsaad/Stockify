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
    enabled : true,
    gcTime: Infinity, // Keep data in cache until app is closed
    staleTime: 1000 * 60 * 60, // Consider data fresh for 60 minutes
  });
};