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
  <div className="relative h-screen flex items-center">

     {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="absolute top-40 right-[10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-teal-100 rounded-full blur-3xl -z-10"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
      {plans?.data?.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSuperAdminView={false}
        />
      ))}
    </div>
  </div>
);

};

export default Tarifs;