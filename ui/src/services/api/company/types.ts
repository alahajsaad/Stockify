import { SubscriptionStatus } from "@/types";


export type GetCompaniesParams = {
  page?: number;
  size?: number;
  keyword?: string;
  subscriptionStatus?: SubscriptionStatus;
  isNew?: boolean;
  subscriptionPlanName?: string;
};


export type ConsultCompanyDto = {
  id: number;
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  isNew: boolean;
  currentSubscriptionPlanName: string;
  currentSubscriptionStatus: SubscriptionStatus;
};