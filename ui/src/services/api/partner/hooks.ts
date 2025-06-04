import { Page } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { PartnerResponseDto, PartnerType } from "./types";
import { getPartners } from "./api";

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
  return useQuery<Page<PartnerResponseDto>, Error>({
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
