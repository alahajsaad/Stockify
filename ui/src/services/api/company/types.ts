import { SubscriptionPlan } from "../subscriptionPlan/types";


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


export type Company = {
  createdAt: string; 
  updatedAt: string; 
  id: number;
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  logo: string;
  numberOfUser: number;
  isNew: boolean;
  tenantId: string;
  subscriptions: Subscription[];
};

export type Subscription = {
  id: number;
  startDate: string; 
  endDate: string;   
  status: SubscriptionStatus; 
  subscriptionPlan: SubscriptionPlan;
};

export type SubscriptionStatus =  "ACTIVE" | "CANCELLED" | "EXPIRED" | "ALL" 


export type CompanyMetrics = {
  totalCompanies: number;
  totalUsers: number;
  newCompaniesThisMonth: number;
  averageUsersPerCompany: number;
};
