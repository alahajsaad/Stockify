// ConsultCompaniesPage.tsx - Page principale corrigée
import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import CompanyFilters from "../components/CompanyFilters";
import { SubscriptionStatus } from "@/types";
import { useGetCompanies } from "@/services/api/company/hooks";
import { GetCompaniesParams } from "@/services/api/company/types";
import CompaniesTable from "../components/CompaniesTable";

const ConsultCompaniesPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [searchKey, setSearchKey] = useState<string>('');
  const [selectedSubStatus, setSelectedSubStatus] = useState<SubscriptionStatus | 'ALL'>('ALL');
  const [selectedSubPlanName, setSelectedSubPlanName] = useState<string>('');
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined);

  // Construire les paramètres de filtre
  const filter: GetCompaniesParams = {
    page,
    size,
    keyword: searchKey || undefined,
    subscriptionStatus: selectedSubStatus !== 'ALL' ? selectedSubStatus : undefined,
    subscriptionPlanName: selectedSubPlanName || undefined,
    isNew
  };

  const { data, isPending, refetch } = useGetCompanies(filter);

  useEffect(() => {
    refetch();
  }, [searchKey, selectedSubStatus, selectedSubPlanName, isNew, page, refetch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Building2 className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entreprises</h1>
          <p className="text-gray-600 mt-1">
            Gérez les entreprises inscrites sur votre plateforme
          </p>
        </div>
      </div>

      <CompanyFilters
        setSearchKey={setSearchKey}
        isSearchPending={isPending}
        selectedSubStatus={selectedSubStatus}
        setSelectedSubStatus={setSelectedSubStatus}
        selectedSubPlanName={selectedSubPlanName}
        setSelectedSubPlanName={setSelectedSubPlanName}
        setIsNew={setIsNew}
        isNew={isNew}
      />

      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : data && data?.data?.content && data.data.content.length > 0 ? (
        <CompaniesTable data={data.data.content} />
      ) : (
        <div className="text-center py-8">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune entreprise inscrite pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default ConsultCompaniesPage;