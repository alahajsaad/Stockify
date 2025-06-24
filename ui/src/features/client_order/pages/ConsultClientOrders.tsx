// Import des hooks et composants nécessaires
import { DynamicPartner } from "@/services/api/partner/types";
import { PackageMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import TableNav from "@/components/ui/TableNav";
import { DeliveryStatus, PaymentStatus } from "@/types";
import { GetClientOrdersParams } from "@/services/api/ClientOrder/types";
import ClientOrdersFilter from "../components/ClientOrdersFilter";
import ClientOrdersTable from "../components/ClientOrdersTable";
import { useGetClientOrders } from "@/services/api/ClientOrder/hooks";

const ConsultClientOrders: React.FC = () => {
  // Récupération des paramètres de l'URL
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lecture des paramètres avec des valeurs par défaut
  const page = parseInt(searchParams.get('page') || '0', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const partnerId = searchParams.get('partnerId');
  const paymentStatus = searchParams.get('paymentStatus') as PaymentStatus | undefined;
  const deliveryStatus = searchParams.get('deliveryStatus') as DeliveryStatus | undefined;

  // État local pour afficher le partenaire sélectionné dans le filtre
  const [partner, setPartner] = useState<DynamicPartner | undefined>(undefined);

  // Préparation de l'objet de filtre pour la requête API
  const filter: GetClientOrdersParams = {
    page,
    size,
    partnerId: partnerId ? parseInt(partnerId, 10) : undefined,
    paymentStatus,
    deliveryStatus,
  };
  console.log(filter)

  // Récupération des commandes via la requête API
  const { data: clientOrders, isPending, refetch } = useGetClientOrders(filter);

  // Re-fetch des données quand les paramètres changent
  useEffect(() => {
    refetch();
  }, [partnerId, paymentStatus, deliveryStatus, page, size, refetch]);

  
  const updateSearchParams = (params: any) => {
    // Convert searchParams to an object
    const currentParams: any = {};
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });

    // Filter out empty values to clean the URL
    const filteredParams: any = {};
    Object.entries({ ...currentParams, ...params }).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        filteredParams[key] = value;
      }
    });

    setSearchParams(filteredParams);
  };


  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex items-center space-x-3">
        <PackageMinus className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commandes clients</h1>
          <p className="text-gray-600 mt-1">Gérez les commandes clients</p>
        </div>
      </div>

      {/* Filtres de recherche */}
      <ClientOrdersFilter
        client={partner}
        setClient={(client) => {
          setPartner(client); // Mise à jour de l'état local pour l'affichage
          updateSearchParams({ partnerId: client?.id || '' }); // Mise à jour de l'URL
        }}
        PaymentStatus={paymentStatus}
        DeliveryStatus={deliveryStatus}
        setPaymentStatus={(status) => updateSearchParams({ paymentStatus: status || '' })}
        setDeliveryStatus={(status) => updateSearchParams({ deliveryStatus: status || '' })}
        updateSearchParams={updateSearchParams}
      />

      {/* Affichage conditionnel : chargement, tableau ou message d'absence */}
      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : clientOrders && clientOrders.content.length > 0 ? (
        <>
          {/* Tableau des commandes */}
          <ClientOrdersTable
            data={clientOrders.content}
            // Navigation vers les détails avec les filtres conservés dans l'URL
            onViewDetails={(orderId) => navigate(`/clientOrders/${orderId}?${searchParams.toString()}`)}
          />
          {/* Navigation entre les pages */}
          <TableNav
            data={clientOrders}
            page={page}
            setPage={(newPage) => updateSearchParams({ page: newPage.toString() })}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <PackageMinus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune commande client trouvée.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultClientOrders;
