export interface SubscriptionPlan {
  id?: number;           
  name: string;
  price: number;
  maxUsers: number;
  maxStorageMb: number;
  features: string;      
}
