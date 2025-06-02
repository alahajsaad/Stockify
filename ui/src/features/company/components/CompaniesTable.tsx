// CompaniesTable.tsx - Composant tableau corrigé
import React from 'react';
import Table from "@/components/ui/Table";
import { ConsultCompanyDto } from "@/services/api/company/types";
import { Badge } from "@/components/ui/shadcn/badge";
import { Phone, Mail } from 'lucide-react';
import { SubscriptionStatus } from '@/types';
import { Paths } from '@/lib/paths';

type CompaniesTableProps = {
  data: ConsultCompanyDto[];
};

type TransformedData = {
  id: number;
  name: string;
  taxNumber: string;
  contact: JSX.Element;
  isNew: JSX.Element;
  subscription: JSX.Element;
};

// Fonction pour afficher les informations de contact
const contactDisplay = (email: string, phone: string): JSX.Element => {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-1 text-sm">
        <Mail className="w-3 h-3 text-gray-500" />
        <span className="text-gray-700">{email}</span>
      </div>
      <div className="flex items-center space-x-1 text-sm">
        <Phone className="w-3 h-3 text-gray-500" />
        <span className="text-gray-700">{phone}</span>
      </div>
    </div>
  );
};

// Fonction pour afficher le statut "nouveau"
const isNewDisplay = (isNew: boolean): JSX.Element => {
  return (
    <div>
      {isNew ? (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Nouveau
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-600">
          Existant
        </Badge>
      )}
    </div>
  );
};

// Fonction pour afficher les informations d'abonnement
const subscriptionDisplay = (planName: string, status: SubscriptionStatus): JSX.Element => {
  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: SubscriptionStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'Actif';
      case 'EXPIRED':
        return 'Expiré';
      case 'CANCELLED':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-900">{planName}</div>
      <Badge className={getStatusColor(status)}>
        {getStatusText(status)}
      </Badge>
    </div>
  );
};

const CompaniesTable: React.FC<CompaniesTableProps> = ({ data }) => {
  // En-têtes corrigés pour correspondre aux données des entreprises
  const head = ["Nom", "N° Fiscal", "Contact", "Statut", "Abonnement"];

  // Transformer les données des entreprises
  const tableData: TransformedData[] = data.map(company => ({
    id: company.id,
    name: company.name,
    taxNumber: company.taxNumber,
    contact: contactDisplay(company.email, company.phone),
    isNew: isNewDisplay(company.isNew),
    subscription: subscriptionDisplay(company.currentSubscriptionPlanName, company.currentSubscriptionStatus)
  }));

  return (
    <Table head={head} data={tableData} variant={"WithNavigation"}/>
  );
};

export default CompaniesTable;