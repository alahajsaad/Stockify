import React from 'react';
import { Users, HardDrive } from 'lucide-react';
import FeatureList from './FeatureList';
import { Currency } from '@/lib/currency';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxUsers: number;
  maxStorageMb: number;
  features: string;
  popular?: boolean;
}

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit?: () => void;
  isSuperAdminView : boolean
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit ,isSuperAdminView }) => {
  const getPlanColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'basic':
        return {
          border: 'border-blue-200',
          button: 'border-blue-600 text-blue-600 hover:bg-blue-50',
          badge: 'bg-blue-100 text-blue-800',
          accent: 'text-blue-600'
        };
      case 'standard':
        return {
          border: 'border-purple-200',
          button: 'border-purple-600 text-purple-600 hover:bg-purple-50',
          badge: 'bg-purple-100 text-purple-800',
          accent: 'text-purple-600'
        };
      case 'premium':
        return {
          border: 'border-orange-200',
          button: 'border-orange-600 text-orange-600 hover:bg-orange-50',
          badge: 'bg-orange-100 text-orange-800',
          accent: 'text-orange-600'
        };
      case 'enterprise':
        return {
          border: 'border-green-200',
          button: 'border-green-600 text-green-600 hover:bg-green-50',
          badge: 'bg-green-100 text-green-800',
          accent: 'text-green-600'
        };
      default:
        return {
          border: 'border-gray-200',
          button: 'border-gray-600 text-gray-600 hover:bg-gray-50',
          badge: 'bg-gray-100 text-gray-800',
          accent: 'text-gray-600'
        };
    }
  };

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(0)} GB`;
    }
    return `${mb} MB`;
  };

  const colors = getPlanColor(plan.name);

  return (
    <div className={`bg-white rounded-xl border-2 ${colors.border} shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}>
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
          Populaire
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-bold ${colors.accent}`}>
              {plan.price.toFixed(2) + " " + Currency}
            </span>
            <span className="text-gray-500 text-sm">/ mois</span>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <div className={`p-1.5 rounded-lg ${colors.badge}`}>
              <Users className="h-4 w-4" />
            </div>
            <span className="text-sm">
              Jusqu'à <span className="font-semibold">{plan.maxUsers}</span> utilisateur{plan.maxUsers > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <div className={`p-1.5 rounded-lg ${colors.badge}`}>
              <HardDrive className="h-4 w-4" />
            </div>
            <span className="text-sm">
              <span className="font-semibold">{formatStorage(plan.maxStorageMb)}</span> de stockage
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Fonctionnalités incluses :</h4>
          <FeatureList features={plan.features} />
        </div>

        {/* Action Button */}
        {isSuperAdminView &&
         <button
          onClick={onEdit}
          className={`w-full py-2.5 px-4 border-2 rounded-lg font-semibold text-sm transition-all duration-200 ${colors.button}`}
        >
          Modifier le plan
        </button>
        }
       
      </div>
    </div>
  );
};

export default PlanCard;