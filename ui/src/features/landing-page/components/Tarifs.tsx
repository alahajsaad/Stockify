import React from 'react';
import PlanCard from "@/features/subscription/components/PlanCard";
import { useGetSubscriptionPlans } from "@/services/api/subscription_plan/hooks";

const Tarifs: React.FC = () => {
  const { data: plans, isPending } = useGetSubscriptionPlans();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des tarifs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plans?.data?.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSuperAdminView={false}
        />
      ))}
    </div>
  );
};

export default Tarifs;