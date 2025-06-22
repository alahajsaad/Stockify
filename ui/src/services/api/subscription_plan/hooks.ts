import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubscriptionPlan} from "./types";
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
  getSubscriptionPlans,
} from "./api";
import { ApiResponse } from "@/types";

export const SUBSCRIPTION_PLANS_KEY = ["SubscriptionPlans"];

export const useGetSubscriptionPlans = () => {
  return useQuery<ApiResponse<SubscriptionPlan[]>, Error>({
    queryKey: SUBSCRIPTION_PLANS_KEY,
    queryFn: () => getSubscriptionPlans().then(response => {
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,   // 30 minutes
  });
};

export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SubscriptionPlan>, Error, SubscriptionPlan>({
    mutationFn: createSubscriptionPlan,
    onSuccess: (response) => {
      const newPlan = response.data;
      if (!newPlan) return;

      queryClient.setQueryData<ApiResponse<SubscriptionPlan[]>>(SUBSCRIPTION_PLANS_KEY, (oldData) => {
        if (!oldData || !oldData.data) {
          return {
            status: "success",
            message: "Created new plan",
            data: [newPlan],
          };
        }

        return {
          ...oldData,
          data: [...oldData.data, newPlan],
        };
      });
    },
    onError: (error) => {
      console.error("Failed to create subscription plan:", error.message);
    }
  });
};

export const useUpdateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SubscriptionPlan>, Error, SubscriptionPlan>({
    mutationFn: updateSubscriptionPlan,
    onSuccess: (response) => {
      const updatedPlan = response.data;
      if (!updatedPlan) return;

      queryClient.setQueryData<ApiResponse<SubscriptionPlan[]>>(SUBSCRIPTION_PLANS_KEY, (oldData) => {
        if (!oldData || !oldData.data) return oldData;

        const updatedData = oldData.data.map(plan =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        );

        return {
          ...oldData,
          data: updatedData,
        };
      });
    },
    onError: (error) => {
      console.error("Failed to update subscription plan:", error.message);
    }
  });
};
