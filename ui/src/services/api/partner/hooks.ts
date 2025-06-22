import { Page } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DynamicPartner, PartnerType } from "./types";
import { getPartnerById, getPartners } from "./api";

export const useGetPartners = (
  params: {
    keyword?: string
    partnerType: PartnerType
    page?: number
    size?: number
  },
  options?: {
    enabled?: boolean
  }
) => {
  return useQuery<Page<DynamicPartner>, Error>({
    queryKey: ['partners', params],
    queryFn: () => {
      return getPartners(params).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        if (!response.data) {
          throw new Error('No data returned from server');
        }
        return response.data;
      });
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false,
    enabled: options?.enabled ?? true // Default to true, but allow override
  });
};


export const useGetPartnerById = (id: number) => {
  return useQuery<DynamicPartner, Error>({
    queryKey: ['partners', id], 
    queryFn: () => getPartnerById(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as DynamicPartner;
    }),
  });
};