// CompanyFilters.tsx - Composant filtres corrigé
import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button, SearchInput } from 'src/components/ui';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import Select from '@/components/ui/Select';
import { useGetSubscriptionPlans } from '@/services/api/subscriptionPlan/hooks';
import { SubscriptionStatus } from '@/types';

export interface CompanyFilters {
  search: string;
  status: SubscriptionStatus | 'ALL';
  city: string;
  plan: string;
  isNew: boolean | null;
}

interface CompanyFiltersProps {
  setSearchKey: (key: string) => void;
  isSearchPending: boolean;
  setSelectedSubStatus: (status: SubscriptionStatus | 'ALL') => void;
  selectedSubStatus: SubscriptionStatus | 'ALL';
  setSelectedSubPlanName: (name: string) => void;
  selectedSubPlanName?: string;
  setIsNew: (isNew: boolean | undefined) => void;
  isNew?: boolean;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ 
  setSearchKey, 
  isSearchPending,
  selectedSubStatus, 
  setSelectedSubStatus,
  selectedSubPlanName, 
  setSelectedSubPlanName,
  setIsNew,
  isNew
}) => {
  const handleReset = () => {
    setSearchKey('');
    setSelectedSubStatus('ALL');
    setSelectedSubPlanName('');
    setIsNew(undefined);
  };

  const { data, isPending } = useGetSubscriptionPlans();
  
  let subPlans: string[] = [];
  if (data) {
    subPlans = data.data?.map((plan) => plan.name) || [];
  }

  const subscriptionOptionsMap = new Map<string, string>([
    ["ALL", "Tous les abonnements"],
    ["ACTIVE", "Abonnement actif"],
    ["EXPIRED", "Abonnement expiré"],
    ["CANCELLED", "Abonnement annulé"]
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>
        <Button onClick={handleReset} >
          <RotateCcw className="w-4 h-4 mr-1" />
          Réinitialiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchInput
          setSearchKey={setSearchKey}
          isPending={isSearchPending}
          placeholder="Rechercher par nom d'entreprise"
        />
        
        <Select
          mapOptions={subscriptionOptionsMap}
          setOption={setSelectedSubStatus}
          selectedOption={selectedSubStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
        
        <Select
          listOptions={subPlans}
          setOption={setSelectedSubPlanName}
          selectedOption={selectedSubPlanName}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isNew"
          checked={isNew === true}
          onCheckedChange={(checked) => setIsNew(checked ? true : undefined)}
        />
        <label htmlFor="isNew" className="text-sm text-gray-700 cursor-pointer">
          Nouvelles entreprises uniquement
        </label>
      </div>
    </div>
  );
};

export default CompanyFilters;