// pages/ConsultClientOrders.tsx
import { PackageMinus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientOrdersTable from "../components/ClientOrdersTable";
import TableNav from "@/components/ui/TableNav";
import { useGetClientOrders } from "@/services/api/ClientOrder/hooks";
import ClientOrdersFilter from "./ClientOrdersFilter";
import { ClientOrdersFilterProvider, useClientOrdersFilter } from "./ClientOrdersFilterContext";

const ConsultClientOrdersContent = () => {
  const {
    partner,
    paymentStatus,
    deliveryStatus,
    page,
    size,
    updateSearchParams,
  } = useClientOrdersFilter();
  const navigate = useNavigate();

  const { data: clientOrders, isPending, refetch } = useGetClientOrders({
    partnerId: partner?.id,
    paymentStatus,
    deliveryStatus,
    page,
    size,
  });

  useEffect(() => {
    refetch();
  }, [partner, paymentStatus, deliveryStatus, page, size]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <PackageMinus className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commandes clients</h1>
          <p className="text-gray-600 mt-1">Gérez les commandes clients</p>
        </div>
      </div>

      <ClientOrdersFilter />

      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : clientOrders && clientOrders.content.length > 0 ? (
        <>
          <ClientOrdersTable data={clientOrders.content} onViewDetails={(id) => navigate(`/clientOrders/${id}`)} />
          <TableNav data={clientOrders} page={page} setPage={(p) => updateSearchParams({ page: p.toString() })} />
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

const ConsultClientOrders = () => (
  <ClientOrdersFilterProvider>
    <ConsultClientOrdersContent />
  </ClientOrdersFilterProvider>
);

export default ConsultClientOrders;
