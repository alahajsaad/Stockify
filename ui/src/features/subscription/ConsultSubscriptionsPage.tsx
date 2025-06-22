import  { useState } from 'react';
import { Plus, HardDrive, Shield } from 'lucide-react';
import PlanCard from './components/PlanCard';
import PlanModal from './components/PlanModal';
import { useGetSubscriptionPlans } from '@/services/api/subscription_plan/hooks';
import Modal from '@/components/ui/Modal';
import SubscriptionPlanForm from './components/SubscriptionPlanForm';


interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxUsers: number;
  maxStorageMb: number;
  features: string;
  popular?: boolean;
}



const ConsultSubscriptionsPage = () => {
   const [isAdding, setIsAdding] = useState<boolean>(false);
   const [isUpdating, setIsUpdating] = useState<boolean>(false);
   const [plan ,setPlan] = useState<SubscriptionPlan>()

  const {data : plans , isPending} = useGetSubscriptionPlans()
  
 

 const handleEdit = (plan : SubscriptionPlan) => {
      setPlan(plan);
      setIsUpdating(true);
  };

  
   const onUpdateSuccess = (success: boolean) => {
    if (success) {
      setIsUpdating(false);
      setPlan(undefined);
    }
  };
  const onAddSuccess = () => {
    setIsAdding(false)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                Plans d'Abonnement
              </h1>
              <p className="text-lg text-gray-600">
                Gérez vos offres d'abonnement • {plans?.data?.length} plan{plans?.data?.length > 1 ? 's' : ''} disponible{plans?.data?.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Ajouter un Plan
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans?.data?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => handleEdit(plan)}
              isSuperAdminView={true}
            />
          ))}
        </div>

        {/* Empty State */}
        {plans?.data?.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
              <HardDrive className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun plan disponible
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier plan d'abonnement
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Créer un Plan
            </button>
          </div>
        )}
      </div>

      <Modal
          title="mettre a jour un plan d'abonnement"
          isOpen={isUpdating}
          onClose={() => setIsUpdating(false)}
          size="lg"
      >
          <SubscriptionPlanForm  onUpdateSuccess={onUpdateSuccess} initialPlan={plan}/>
      </Modal>

      <Modal
          title="Ajouter un plan d'abonement"
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          size="lg"
      >
          <SubscriptionPlanForm onAddSuccess={onAddSuccess}/>
      </Modal>
    </div>
  );
};

export default ConsultSubscriptionsPage;