import  { useState } from 'react';
import { Plus, HardDrive } from 'lucide-react';
import PlanCard from './components/PlanCard';
import PlanModal from './components/PlanModal';


interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxUsers: number;
  maxStorageMb: number;
  features: string;
  popular?: boolean;
}

const mockPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    maxUsers: 5,
    maxStorageMb: 1024, // 1GB
    features: "Gestion de base,Support email,Rapport mensuel",
    popular: false
  },
  {
    id: 2,
    name: "Standard", 
    price: 19.99,
    maxUsers: 15,
    maxStorageMb: 5120, // 5GB
    features: "Toutes fonctions Basic,Support prioritaire,Rapports avancés,API access",
    popular: true
  },
  {
    id: 3,
    name: "Premium",
    price: 39.99,
    maxUsers: 50,
    maxStorageMb: 10240, // 10GB
    features: "Toutes fonctions Standard,Support 24/7,Analytics avancés,Intégrations",
    popular: false
  },
  {
    id: 4,
    name: "Enterprise",
    price: 79.99,
    maxUsers: 200,
    maxStorageMb: 51200, // 50GB
    features: "Toutes fonctions Premium,Support dédié,Personnalisation,SLA garanti,Intégrations sur mesure",
    popular: false
  }
];

const ConsultSubscriptionsPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const handleAddPlan = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSavePlan = (planData: Omit<SubscriptionPlan, 'id'>) => {
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? { ...planData, id: editingPlan.id }
          : plan
      ));
    } else {
      // Add new plan
      const newPlan = {
        ...planData,
        id: Math.max(...plans.map(p => p.id)) + 1
      };
      setPlans([...plans, newPlan]);
    }
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <HardDrive className="h-8 w-8 text-white" />
                </div>
                Plans d'Abonnement
              </h1>
              <p className="text-lg text-gray-600">
                Gérez vos offres d'abonnement • {plans.length} plan{plans.length > 1 ? 's' : ''} disponible{plans.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={handleAddPlan}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Ajouter un Plan
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => handleEditPlan(plan)}
            />
          ))}
        </div>

        {/* Empty State */}
        {plans.length === 0 && (
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
              onClick={handleAddPlan}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Créer un Plan
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <PlanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePlan}
        editingPlan={editingPlan}
      />
    </div>
  );
};

export default ConsultSubscriptionsPage;